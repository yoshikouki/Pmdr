export type SetupAlarmAttributes = {
  sound?: string;
  vibration?: boolean;
  message?: string;
};

type AlarmAttributes = {
  sound?: string;
  vibration?: boolean;
  message: string;
};
export type Alarm = AlarmAttributes & {
  run: () => void;
};

const runAlarm = (attr: AlarmAttributes) => {
  console.log(attr.message);
};

export const createAlarm = (attr?: SetupAlarmAttributes): Alarm => {
  const alarmAttributes: AlarmAttributes = {
    sound: undefined,
    vibration: false,
    message: "Hello, world!!1",
    ...attr,
  };
  return {
    ...alarmAttributes,
    run: () => runAlarm(alarmAttributes),
  };
};
