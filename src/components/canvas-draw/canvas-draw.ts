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

  // Pencil data
  public currentColour: string = '#2ecc71';
  public currentSize: number = 5;

  // Colors
  public avalaibleColours: string[];
  public availableColoursNames: string[] = ['Negro', 'Verde', 'Azul', 'Morado', 'Rojo', 'Naranja', 'Blanco'];


  constructor(
    public platform: Platform,
    public renderer: Renderer
  ) {

    this.avalaibleColours = ['#000', '#2ecc71', '#3498db', '#9b59b6', '#e74c3c', '#e67e22','#fff'];

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
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.currentSize;
    ctx.stroke();

    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
  }

  public handleEnd(ev) {

  }

  public handleClick(ev) {
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.clientX;
    let currentY = ev.clientY;

    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.moveTo(currentX, currentY);
    ctx.arc(currentX, currentY, this.currentSize / 4, 0, 2*Math.PI);
    ctx.closePath();
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.currentSize;
    ctx.stroke();
  }

  public changeColour(newColor : string) {
    this.currentColour = newColor;
  }

  public changeSize(newSize : number) {
    this.currentSize = newSize;
  }
}
