class TaskScheduler {
    private task: () => void;
    private interval: number;
    private intervalId: NodeJS.Timeout | null;
    private startTime: number | null;

    constructor(task: () => void, interval: number) {
        this.task = task;
        this.interval = interval;
        this.intervalId = null;
        this.startTime = null;
    }

    start() {
        if (!this.intervalId) {
            this.startTime = Date.now();
            this.intervalId = setInterval(() => {
                console.log('Task executed');
                this.task();
            }, this.interval);
        } else {
            console.warn('Task is already running.');
        }
    }

    getSecondsLeft(): number | null {
        if (this.startTime && this.intervalId) {
            const elapsedTime = Date.now() - this.startTime;
            const remainingTime = this.interval - (elapsedTime % this.interval);
            return Math.ceil(remainingTime / 1000);
        }
        return null;
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        } else {
            console.warn('Task is not running.');
        }
    }
}

export default TaskScheduler;
