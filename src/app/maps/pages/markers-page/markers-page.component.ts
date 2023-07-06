import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit{
  @ViewChild('map') divMap?: ElementRef;
  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40);


  ngAfterViewInit(): void {

    if(!this.divMap) throw 'This HTML element was not found';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      minZoom: 2,
      });

      const marker = new Marker({ color: 'red'}).setLngLat(this.currentLngLat).addTo(this.map);
  }

}
