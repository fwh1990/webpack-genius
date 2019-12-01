import os from 'os';
import path from 'path';
import crypto from 'crypto';
import mkdirp from 'mkdirp';
import findCacheDir from 'find-cache-dir';
// @ts-ignore
import transform from './transform';
// Lazily instantiated when needed
let defaultCacheDirectory = null;

const cacheData: Record<string, any> = {};
type File = { name: string; hash: string; };

const write = function (filename: File, _compress: boolean, result: object) {
  cacheData[filename.name] = [filename.hash, result];
};

const read = function (filename: File, _compress: boolean) {
  if (cacheData[filename.name] === undefined || cacheData[filename.name][0] !== filename.hash) {
    throw new Error('');
  }

  return cacheData[filename[0]][1];
};

const filename = (source: string, identifier: object, options: { filename: string }): File => {
  const hash = crypto.createHash('md4');
  const contents = JSON.stringify({
    source,
    options,
    identifier
  });
  hash.update(contents);

  return {
    hash: hash.digest('hex'),
    name: options.filename,
  };
};

const handleCache = async (directory: string, params: any) => {
  const {
    source,
    options = {},
    cacheIdentifier,
    cacheDirectory,
    cacheCompression,
  } = params;

  const file = filename(source, cacheIdentifier, options);
  file.hash = path.join(directory, file.hash);

  try {
    // No errors mean that the file was previously cached
    // we just need to return it
    return await read(file, cacheCompression);
  } catch (err) {
  }

  const fallback = typeof cacheDirectory !== 'string' && directory !== os.tmpdir();

  // Make sure the directory exists.
  try {
    await mkdirp(directory);
  } catch (err) {
    if (fallback) {
      return handleCache(os.tmpdir(), params);
    }

    throw err;
  }

  // Otherwise just transform the file
  // return it to the user asap and write it in cache
  const result = await transform(source, options);

  try {
    await write(file, cacheCompression, result);
  } catch (err) {
    if (fallback) {
      // Fallback to tmpdir if node_modules folder not writable
      return handleCache(os.tmpdir(), params);
    }

    throw err;
  }

  return result;
};

export default async (params) => {
  let directory;

  if (typeof params.cacheDirectory === 'string') {
    directory = params.cacheDirectory;
  } else {
    if (defaultCacheDirectory === null) {
      defaultCacheDirectory = findCacheDir({ name: 'babel-loader' }) || os.tmpdir();
    }

    directory = defaultCacheDirectory;
  }

  return await handleCache(directory, params);
};
