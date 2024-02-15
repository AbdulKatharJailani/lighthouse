import fs from 'fs';
import archiver from 'archiver';

const zipReportFolder = async (folderPath) => {
  return new Promise((resolve, reject) => {
    const zipFileName = `${folderPath}.zip`;
    const outputZip = fs.createWriteStream(zipFileName);
    const archive = archiver('zip', { zlib: { level: 9 } });

    outputZip.on('close', () => {
      console.log(`Report folder zipped to ${zipFileName}`);
      resolve(zipFileName);
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(outputZip);
    archive.directory(folderPath, false);
    archive.finalize();
  });
};

export default zipReportFolder;
