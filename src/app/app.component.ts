import { Component, OnInit, OnDestroy, NgZone, ElementRef,Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { zoneService } from "./Services/zoneservice";
import { ZoneModle } from "./Services/zonemodel";
import { ViewEncapsulation } from '@angular/core';

declare var shareData :any;
@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements Iappcomponent {

  //Property
  private values = 'ABC';
  private currentState = 'Current Value';
  private url: SafeResourceUrl;

  //Constructor
  constructor(private renderer:Renderer2, private _ngzone: NgZone, private _zoneService: zoneService, private _zoneModel: ZoneModle, private el: ElementRef, private sanitizer: DomSanitizer) { }

  // Page_load
  ngOnInit() {
    window.winNgRef = window.winNgRef || {};
    window.winNgRef.callBackFunc = this.setValuesFunc.bind(this);
    this.setServiceValue();
    let url = `Angular_flex_project.swf`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log(this.el.nativeElement);
  
   
  }

  ngAfterViewInit(){
this.renderer.setStyle(this.el.nativeElement.querySelector('.flexView'), 'height', "50%");
  
  }


  ngAfterViewChecked(){
this.renderer.setStyle(this.el.nativeElement.querySelector('.flexView'), 'height', "150%");
  }


  // Page_unload
  ngOnDestory() {
    window.winNgRef.callBackFunc=null;
  }

  //Events
  updateValue(): void {
    this.currentState = 'Update with Inside Zone';
    this.values = 'PQR';
    this.setServiceValue();
    

  }
  resetValue(): void {
    this.currentState = 'Current Value';
    this.values = 'ABC';
    this.setServiceValue();
  }
  reteriveValue() {
    let objVal = this._zoneService.getValues();
    alert(objVal.currentState + '' + objVal.currentValue);
  }

  saveValue():any {
   this._ngzone.runOutsideAngular(()=>{
      this.setReturnVal();
   })
  }

  setReturnVal():any{
    shareData();
  }

  //Private Function
  setValuesFunc(passingObj): void {
    this._ngzone.run(() => {
      this.currentState = 'Update with OutSide Zone';
      this.values = passingObj.values;
      this.setServiceValue();
    });
  }
  setServiceValue() {
    this._zoneModel.currentState = this.currentState;
    this._zoneModel.currentValue = this.values;
    this._zoneService.setValues(this._zoneModel);
  }

}
