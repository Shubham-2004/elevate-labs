import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { UbCardContentDirective, UbCardDescriptionDirective, UbCardDirective, UbCardFooterDirective, UbCardHeaderDirective, UbCardTitleDirective } from '@/components/ui/card';

@Component({
  selector: 'app-logogenerate',
  imports: [ UbCardContentDirective,
      UbCardDescriptionDirective,
      UbCardDirective,
      UbCardFooterDirective,
      UbCardHeaderDirective,
      UbCardTitleDirective,],
  templateUrl: './logogenerate.component.html',
  styleUrls: ['./logogenerate.component.css'],
})
export class LogogenerateComponent implements AfterViewInit {
  @ViewChild('drawingCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  thickness: number = 5; // Default thickness
  color: string = '#000000'; // Default color
  private ctx!: CanvasRenderingContext2D;
  private drawing: boolean = false;
  mode: string = 'draw'; // Default mode
  history: string[] = [];

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineWidth = this.thickness;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.color;

    canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    canvas.addEventListener('mousemove', this.draw.bind(this));
  }

  setThickness(newThickness: number) {
    this.thickness = newThickness;
    if (this.ctx) {
      this.ctx.lineWidth = this.thickness;
    }
  }

  setColor(newColor: string) {
    this.color = newColor;
    if (this.ctx) {
      this.ctx.strokeStyle = this.mode === 'draw' ? this.color : 'white';
    }
  }

  setMode(newMode: string) {
    this.mode = newMode;
  }

  private startDrawing(event: MouseEvent) {
    this.drawing = true;
    const pos = this.getMousePosition(event);
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }

  private stopDrawing() {
    this.drawing = false;
    this.ctx.closePath();
    this.saveState();
  }

  private draw(event: MouseEvent) {
    if (!this.drawing) return;
    const pos = this.getMousePosition(event);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  private getMousePosition(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  saveState() {
    this.history.push(this.canvasRef.nativeElement.toDataURL());
  }

  undo() {
    if (this.history.length > 0) {
      const lastState = this.history.pop();
      if (lastState) {
        const img = new Image();
        img.src = lastState;
        img.onload = () => {
          this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
          this.ctx.drawImage(img, 0, 0);
        };
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.history = [];
  }

  sendDrawing() {
    const dataURL = this.canvasRef.nativeElement.toDataURL();
    console.log('Sending drawing:', dataURL);
    alert('Drawing sent! (Check console for data URL)');
  }
}