import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: false, // Make sure it updates dynamically
})
export class TimeAgoPipe implements PipeTransform {
  transform(timestamp: any): string {
    if (!timestamp) return '';

    let date: Date;

    // Handle array timestamp [year, month, day, hour, minute, second]
    if (Array.isArray(timestamp)) {
      const [year, month, day, hour, minute, second] = timestamp;
      date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    } 
    // Handle string timestamp (force UTC interpretation)
    else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        // Fallback for non-ISO strings
        date = new Date(timestamp + 'Z'); // Append Z to force UTC
      }
    }
    // Handle numeric timestamp (assume milliseconds)
    else {
      date = new Date(timestamp);
    }

    // Calculate difference in UTC to avoid timezone issues
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}min`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}ho`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays}d`;
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    //${diffInMonths > 1 ? 's' : ''} ago add it for checking for s
    if (diffInMonths < 12) {
      return `${diffInMonths}m`;
    }
    //${diffInYears > 1 ? 's' : ''} ago add it for checking for s
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}y`;
  }
}
