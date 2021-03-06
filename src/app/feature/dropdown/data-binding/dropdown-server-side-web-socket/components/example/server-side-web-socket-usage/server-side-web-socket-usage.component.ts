import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs';

import {
  GlobalRefService,
  DropdownWebsocketDataFetchService,
  DropdownDataBindCallback
} from 'ornamentum';

import { ExampleData } from 'helper-models';
import { DataFetchService } from 'helper-services';

/**
 * Server side web socket data binding example component.
 */
@Component({
  selector: 'app-server-side-web-socket-usage',
  templateUrl: './server-side-web-socket-usage.component.html'
})
export class ServerSideWebSocketUsageComponent implements OnInit, OnDestroy {
  public onDataBind: DropdownDataBindCallback;
  public intervalSubscription: Subscription;

  constructor(private dataFetchService: DataFetchService,
              private globalRefService: GlobalRefService,
              private dropdownWebSocketDataFetchService: DropdownWebsocketDataFetchService<ExampleData>) {
  }

  /**
   * Component initialize lifecycle event handler.
   */
  public ngOnInit(): void {
    // Create web-socket connection on browser environment only to support server side rendering.
    if (this.globalRefService.isBrowser) {
      this.dropdownWebSocketDataFetchService.init({
        url: `wss://${window.location.hostname}` // web-socket endpoint
      });

      this.onDataBind = this.dropdownWebSocketDataFetchService.onDataBind();

      // Keep the socket connection alive with a hart beat ping
      this.intervalSubscription = interval(40000).subscribe(() => {
        this.dropdownWebSocketDataFetchService.socketStream.next({
          type: 'keep-alive'
        } as any);
      });
    }
  }

  /**
   * Component destroy lifecycle event handler.
   */
  public ngOnDestroy(): void {
    this.dropdownWebSocketDataFetchService.dispose();

    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
