import { Buffer } from 'buffer';
import ControlEvent from './ControlEvent';

export default class KeyCodeControlEvent extends ControlEvent {
    public static PAYLOAD_LENGTH = 13;

    constructor(
        readonly action: number,
        readonly keycode: number,
        readonly repeat: number,
        readonly metaState: number,
    ) {
        super(ControlEvent.TYPE_KEYCODE);
    }

    /**
     * @override
     */
    public toBuffer(): Buffer {
        const buffer = new Buffer(KeyCodeControlEvent.PAYLOAD_LENGTH + 1);
        let offset = 0;
        offset = buffer.writeInt8(this.type, offset);
        offset = buffer.writeInt8(this.action, offset);
        offset = buffer.writeInt32BE(this.keycode, offset);
        offset = buffer.writeInt32BE(this.repeat, offset);
        buffer.writeInt32BE(this.metaState, offset);
        return buffer;
    }

    public toString(): string {
        return `KeyCodeControlEvent{action=${this.action}, keycode=${this.keycode}, metaState=${this.metaState}}`;
    }
}
