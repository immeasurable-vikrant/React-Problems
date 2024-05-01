import React, { useState, useEffect, useRef } from 'react';

interface Timer {
	sec: number;
	min: number;
	hr: number;
}

const DigitalClock: React.FC = () => {
	const [timer, setTimer] = useState<Timer>({ sec: 0, min: 0, hr: 0 });
	const [start, setStart] = useState<boolean>(false);
	const timerIdRef = useRef<number | null>(null);

	useEffect(() => {
		if (start) {
			timerIdRef.current = window.setInterval(() => {
				setTimer((prevTimer) => {
					let { sec, min, hr } = prevTimer;
					sec++;

					if (sec === 60) {
						sec = 0;
						min++;
					}
					if (min === 60) {
						min = 0;
						hr++;
					}

					return { sec, min, hr };
				});
			}, 1000); // Update every second for better performance
		} else {
			if (timerIdRef.current) {
				clearInterval(timerIdRef.current);
			}
		}

		// Cleanup function to clear the interval when component unmounts or when start state changes
		return () => {
			if (timerIdRef.current) {
				clearInterval(timerIdRef.current);
			}
		};
	}, [start]);

	const handleStart = () => setStart(true);
	const handleStop = () => setStart(false);
	const handleReset = () => setTimer({ sec: 0, min: 0, hr: 0 });

	return (
		<div>
			<div>
				<span>
					{`${timer.hr < 10 ? '0' : ''}${timer.hr}`}:
					{`${timer.min < 10 ? '0' : ''}${timer.min}`}:
					{`${timer.sec < 10 ? '0' : ''}${timer.sec}`}
				</span>
			</div>
			<div>
				<button onClick={handleStart} disabled={start}>
					Start
				</button>
				<button onClick={handleStop} disabled={!start}>
					Stop
				</button>
				<button onClick={handleReset}>Reset</button>
			</div>
		</div>
	);
};

export default DigitalClock;
