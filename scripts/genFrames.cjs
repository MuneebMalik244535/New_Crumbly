const fs = require('fs');
const path = require('path');

const scenesConfig = [
  { dir: '02_frames', index: 1, title: 'Origin of Molten' },
  { dir: '03_frames', index: 2, title: 'Artisanal Craft' },
  { dir: '04_frames', index: 3, title: 'Velvety Flow' },
  { dir: '05_frames', index: 4, title: 'Molten Core' },
  { dir: '06_frames', index: 5, title: 'Golden Bake' },
  { dir: '07_frames', index: 6, title: 'Haute Finale' },
  { dir: 'fudge_brownie_frames', index: 7, title: 'Fudge Brownie' },
  { dir: 'lotus_frames', index: 8, title: 'Lotus Biscoff' },
  { dir: 'Oreo_frames', index: 9, title: 'Oreo Stuffed' },
  { dir: 'Peanut_butter_frames', index: 10, title: 'Peanut Butter Melt' },
  { dir: 'Red_Velvet_frames', index: 11, title: 'Red Velvet Crumb' }
];

const allFrames = [];
const sceneInfo = [];

let runningIndex = 0;
scenesConfig.forEach(s => {
  const dirPath = path.join('public/assets/video_frames', s.dir);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')).sort();
  
  sceneInfo.push({
    sceneIndex: s.index,
    dir: s.dir,
    title: s.title,
    frameCount: files.length,
    startIndex: runningIndex,
    endIndex: runningIndex + files.length - 1
  });

  files.forEach((file, localIdx) => {
    allFrames.push({
      src: '/assets/video_frames/' + s.dir + '/' + file,
      sceneIndex: s.index,
      sceneTitle: s.title,
      localIndex: localIdx,
      globalIndex: runningIndex
    });
    runningIndex++;
  });
});

const content = `/**
 * Auto-generated scene frames manifest
 * Contains exact frame paths for all 11 scenes from public/assets/video_frames/
 */

export interface FrameData {
  src: string;
  sceneIndex: number;
  sceneTitle: string;
  localIndex: number;
  globalIndex: number;
}

export interface SceneMeta {
  sceneIndex: number;
  dir: string;
  title: string;
  frameCount: number;
  startIndex: number;
  endIndex: number;
}

export const SCENE_METADATA: SceneMeta[] = ${JSON.stringify(sceneInfo, null, 2)};

export const ALL_FRAMES: FrameData[] = ${JSON.stringify(allFrames, null, 2)};

export const TOTAL_FRAME_COUNT = ALL_FRAMES.length;
`;

fs.writeFileSync('src/data/sceneFrames.ts', content, 'utf8');
console.log('Successfully wrote src/data/sceneFrames.ts with', allFrames.length, 'frames across', sceneInfo.length, 'scenes');
