import html2canvas from 'html2canvas';

export class DrawingCanvasUI {
  constructor(container, screenshotWrapper) {
    this.container = document.querySelector(container);
    this.screenshotWrapper = document.querySelector(screenshotWrapper);
  }

  async drawCanvas() {
    const canvas = await html2canvas(this.container, {
      useCORS: true,
      removeContainer: true,
      backgroundColor: null,
    });
    canvas.toDataURL('image/jpeg');
    this.screenshotWrapper.removeChild(this.screenshotWrapper.lastChild);
    this.screenshotWrapper.appendChild(canvas);
  }
}
