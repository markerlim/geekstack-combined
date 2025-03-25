import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: false, // Make sure it updates dynamically
})
export class TimeAgoPipe implements PipeTransform {
  transform(timestamp: any): string {
    if (!timestamp) return '';

    let date: Date;

    // Handle timestamp as an array (e.g., [2025,3,2,20,22,17,361000000])
    if (Array.isArray(timestamp)) {
      const [year, month, day, hour, minute, second] = timestamp;
      date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    } else {
      date = new Date(timestamp); // Handle timestamp as string or number
    }

    const now = new Date();
    const nowUtc = new Date(now.toISOString());
    const diffInSeconds = Math.floor((nowUtc.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec ago`;
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hr ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  }
}
