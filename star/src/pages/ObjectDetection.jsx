// import React, { useEffect, useState } from 'react';
// import SubmitButton from '../components/button/SubmitButton';
// import MenuBar from '../components/MenuBar';
// import SubHeader from '../components/Student/SubHeader';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';

// const ObjectDetection = () => {
//   const [warnings, setWarnings] = useState({});
//   const [stream, setStream] = useState(null);
//   const [model, setModel] = useState(null);
//   const [monitoring, setMonitoring] = useState(false);
//   const [lastPersonDetectedTime, setLastPersonDetectedTime] = useState(null);
//   const [lastNoPersonDetectedTime, setLastNoPersonDetectedTime] = useState(null);

//   const captureScreenshot = (video) => {
//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     return canvas.toDataURL('image/png');
//   };

//   const generateWarning = (violation, duration, timeStamp, screenShot) => {
//     setWarnings(prevWarnings => ({
//       ...prevWarnings,
//       [violation]: {
//         raised: true,
//         count: (prevWarnings[violation]?.count || 0) + 1,
//         totalDuration: (prevWarnings[violation]?.totalDuration || 0) + duration,
//         timeStamps: [...(prevWarnings[violation]?.timeStamps || []), timeStamp],
//         screenshots: [...(prevWarnings[violation]?.screenshots || []), screenShot]
//       }
//     }));
//     alert(`Warning: ${violation} in front of the screen!`);
//   };

//   const detectObjectsOrPersons = async () => {
//     if (!model || !stream) return;

//     const videoElement = document.getElementById('video');

//     try {
//       const predictions = await model.detect(videoElement);

//       let personCount = 0;

//       for (const prediction of predictions) {
//         if (prediction.class === 'person') {
//           personCount++;
//         } else if (['laptop', 'cell phone', 'remote', 'tablet'].includes(prediction.class)) {
//           const startTime = Date.now();
//           while (await isObjectDetected(prediction.class, videoElement)) {
//             await new Promise(resolve => requestAnimationFrame(resolve));
//           }
//           const endTime = Date.now();
//           const duration = (endTime - startTime) / 1000;
//           const screenShot = captureScreenshot(videoElement);
//           generateWarning(`${prediction.class} detected`, duration, startTime, screenShot);
//           setLastPersonDetectedTime(endTime);
//         }
//       }

//       const currentTime = Date.now();

//       if (personCount === 0) {
//         if (lastPersonDetectedTime !== null) {
//           const duration = (currentTime - lastPersonDetectedTime) / 1000;
//           const screenShot = captureScreenshot(videoElement);
//           generateWarning('No person detected', duration, currentTime, screenShot);
//           setLastPersonDetectedTime(null);
//         }
//         if (lastNoPersonDetectedTime === null) {
//           setLastNoPersonDetectedTime(currentTime);
//         }
//       } else if (personCount > 1) {
//         const duration = (currentTime - lastPersonDetectedTime) / 1000;
//         const screenShot = captureScreenshot(videoElement);
//         generateWarning('More than one person detected', duration, currentTime, screenShot);
//         setLastPersonDetectedTime(currentTime);
//         setLastNoPersonDetectedTime(null);
//       } else {
//         setLastPersonDetectedTime(currentTime);
//         if (lastNoPersonDetectedTime !== null) {
//           const screenShot = captureScreenshot(videoElement);
//           const duration = (currentTime - lastNoPersonDetectedTime) / 1000;
//           generateWarning('No person detected', duration, currentTime, screenShot);
//           setLastNoPersonDetectedTime(null);
//         }
//       }
//     } catch (err) {
//       console.error('Error detecting objects or persons:', err);
//     }
//   };

//   const isObjectDetected = async (objectClass, videoElement) => {
//     try {
//       const predictions = await model.detect(videoElement);
//       return predictions.some(prediction => prediction.class === objectClass);
//     } catch (err) {
//       console.error('Error detecting objects:', err);
//       return false;
//     }
//   };

//   const startMonitoring = async () => {
//     try {
//       setMonitoring(true);
//       setLastPersonDetectedTime(null);
//       setLastNoPersonDetectedTime(null);

//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setStream(stream);

//       const detectionModel = await cocoSsd.load();
//       setModel(detectionModel);

//       const intervalId = setInterval(detectObjectsOrPersons, 2000);

//       return () => {
//         clearInterval(intervalId);
//       };
//     } catch (err) {
//       console.error('Error starting monitoring:', err);
//     }
//   };

//   const stopMonitoring = () => {
//     setMonitoring(false);
//     console.log("Warnings:", warnings);
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach(track => track.stop());
//     }
//     setStream(null);
//   };

//   useEffect(() => {
//     startMonitoring();
//   }, []);

//   return (
//     <div className='flex flex-col mb-8 font-body'>
//       <MenuBar name={"Maaz Shamim"} role={"Student"}/>
//       <SubHeader/>
//       <div className="mt-4 md:mx-4 flex flex-col items-center justify-center border-t-4 border-grey-600">
//         <div className="w-full p-8 rounded shadow-md shadow-outline">
//           <div className='flex gap-8'>
//             <video autoPlay id='video' className='w-80 h-64'/>
//             <div className=''>
//               <h2 className='font-bold'>This Assessment requires your webcam to be turned on</h2>
//               <p>
//                 <li>Sit in a well-lit area.</li>
//                 <li>Place your device approximately 2 feet away from you.</li>
//                 <li>Position your device so your face is centered in the frame.</li>
//                 <li>You will not be allowed to start your assessment until only single face is captured in your webcam.</li>
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className='mt-8'>
//           <SubmitButton label="Stop Monitoring" onClick={stopMonitoring} active={true}/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ObjectDetection;
