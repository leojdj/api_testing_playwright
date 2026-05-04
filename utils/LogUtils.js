
/**
 * Comments: Class with generic Log Utils using JS. An idea to handle logs from a single point.
 * Author: Leonardo Antezana
 * Created: 04/29/2026
 */

class LogUtils {
    message;

    /**
     * The method uses the extra console.log to create a carriage return before and after, and allow for 'message' to be a JSON object (prints as object not string).
     */
    print() {
        console.log();
        console.log(this.message)
        console.log();
    }

    info(text) {
        this.message = `INFO:${text}`;
        this.print();
    }

    err(text) {
        this.message = `ERROR:${text}`;
        this.print();
    }

    warn(text) {
        this.message = `WARNING:${text}`;
        this.print();
    }

    obj(json) {
        this.message = json;
        // this.print();
    }
}

// Export an instance of the class.
export let log = new LogUtils();

/** LOG
 * 04292026 Created.
 */