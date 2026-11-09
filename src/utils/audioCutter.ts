// Utility to slice AudioBuffer and export as downloadable WAV file

export function sliceAudioBuffer(
  audioBuffer: AudioBuffer,
  startTime: number,
  endTime: number
): AudioBuffer {
  const sampleRate = audioBuffer.sampleRate;
  const numberOfChannels = audioBuffer.numberOfChannels;

  const startOffset = Math.floor(startTime * sampleRate);
  const endOffset = Math.floor(Math.min(endTime * sampleRate, audioBuffer.length));
  const frameCount = Math.max(0, endOffset - startOffset);

  const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  const slicedBuffer = audioContext.createBuffer(numberOfChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numberOfChannels; channel++) {
    const sourceData = audioBuffer.getChannelData(channel);
    const targetData = slicedBuffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      targetData[i] = sourceData[startOffset + i];
    }
  }

  return slicedBuffer;
}

export function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;

  const numSamples = buffer.length * numChannels;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * bytesPerSample;

  const headerSize = 44;
  const totalSize = headerSize + dataSize;
  const arrayBuffer = new ArrayBuffer(totalSize);
  const dataView = new DataView(arrayBuffer);

  function writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // RIFF Chunk Descriptor
  writeString(dataView, 0, 'RIFF');
  dataView.setUint32(4, 36 + dataSize, true);
  writeString(dataView, 8, 'WAVE');

  // fmt Sub-chunk
  writeString(dataView, 12, 'fmt ');
  dataView.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  dataView.setUint16(20, format, true); // AudioFormat
  dataView.setUint16(22, numChannels, true);
  dataView.setUint32(24, sampleRate, true);
  dataView.setUint32(28, byteRate, true);
  dataView.setUint16(32, blockAlign, true);
  dataView.setUint16(34, bitDepth, true);

  // data Sub-chunk
  writeString(dataView, 36, 'data');
  dataView.setUint32(40, dataSize, true);

  // Write Interleaved Samples
  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      dataView.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([dataView], { type: 'audio/wav' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function sliceAndDownloadAudio(
  audioSrc: string,
  startTime: number,
  endTime: number,
  filename: string
): Promise<boolean> {
  try {
    const response = await fetch(audioSrc);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const sliced = sliceAudioBuffer(decodedBuffer, startTime, endTime);
    const wavBlob = audioBufferToWavBlob(sliced);
    downloadBlob(wavBlob, filename.endsWith('.wav') ? filename : `${filename}.wav`);
    return true;
  } catch (err) {
    console.warn('Could not slice audio directly via Web Audio:', err);
    return false;
  }
}

