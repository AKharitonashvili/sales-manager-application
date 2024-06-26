import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, HttpResponse<any>>();

  get(url: string): HttpResponse<any> | undefined {
    console.log(this.cache);
    return this.cache.get(url);
  }

  set(url: string, response: HttpResponse<any>): void {
    this.cache.set(url, response);
  }

  clear(): void {
    this.cache.clear();
  }

  clearUrl(url: string): void {
    this.cache.delete(url);
  }
}
