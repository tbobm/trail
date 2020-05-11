import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  websocket: WebSocketSubject<any> = webSocket("ws://localhost:3000");
  decoder = new TextDecoder("utf-8");
  private _logs$ = new BehaviorSubject<string[]>([]);
  logs$ = this._logs$.asObservable();

  constructor() {
    this.websocket.asObservable().subscribe((a) => {
      const log = JSON.parse(
        this.decoder.decode(new Uint8Array(a.content.data))
      );
      this._logs$.next([log, ...this._logs$.getValue()].slice(0, 100));
    });
  }
}
