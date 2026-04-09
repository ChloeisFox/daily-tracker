export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications.');
    return 'unsupported';
  }
  const result = await Notification.requestPermission();
  return result;
}

export function maybeShowReminderNotification(bodyText) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Daily Tracker reminder', { body: bodyText });
  }
}
