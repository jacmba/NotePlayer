import * as fs from 'react-native-fs';

const EXTERNAL = 'emulated';
const ROOT = '/storage';
const SELF_DRIVE = 'self';
const EXT_DRIVE = fs.ExternalStorageDirectoryPath;

const NOTES_PATH = '/Media/WhatsApp Voice Notes';
const INT_WS_PATH = '/Android/media/com.whatsapp';
const EXT_WS_PATH = '/Whatsapp';

export const getDrives = async () => {
  const drives = [];
  try {
    const internal = (await fs.readDir(ROOT))
      .filter(d => d.name !== SELF_DRIVE && d.name !== EXTERNAL)
      .map(d => d.path);
    drives.push(...internal);
    const external = await fs.readDir(EXT_DRIVE);
    if (external && external.length > 0) {
      drives.push(EXT_DRIVE);
    }
    return drives;
  } catch (e) {
    console.error('Error reading drives', e);
    return drives;
  }
};

export const getNoteFiles = async drive => {
  const wsPath =
    drive === fs.ExternalStorageDirectoryPath ? EXT_WS_PATH : INT_WS_PATH;
  const notePath = drive + wsPath + NOTES_PATH;

  try {
    const files = await fs.readDir(notePath);
    return files;
  } catch (e) {
    console.log(`Error reading files from [${notePath}]`, e);
    return [];
  }
};

const scanFiles = async () => {
  const drives = await getDrives();
  const files = [];
  for (const drive of drives) {
    const ds = await getNoteFiles(drive);
    const dirs = ds.filter(d => !d.name.startsWith('.') && d.isDirectory());
    const fileList = await dirs.reduce(async (list, d) => {
      try {
        const ls = (await fs.readDir(d.path))
          .filter(f => !f.name.startsWith('.') && f.isFile())
          .map(f => ({name: f.name, path: f.path, size: f.size}));
        return [...list, ...ls];
      } catch (e) {
        console.error('Error reading voice note folder', e);
        return list;
      }
    }, []);

    files.push(...fileList);
  }

  return files;
};

export default scanFiles;
