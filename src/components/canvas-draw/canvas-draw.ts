import {Component, ViewChild, Renderer} from '@angular/core';
import {Platform} from "ionic-angular";


@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent {

  @ViewChild('myCanvas') canvas : any;
  public canvasElement : any;

  // Draw data
  public lastX: number;
  public lastY: number;


  constructor(
    public platform: Platform,
    public renderer: Renderer
  ) {

  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
  }


  public handleStart(ev) {
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
  }

  public handleMove(ev) {
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.stroke();

    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
  }

  public handleEnd(ev) {

  }
}
