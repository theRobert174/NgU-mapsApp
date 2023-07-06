import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit{
  @ViewChild('map') divMap?: ElementRef;
  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40);

  public markers: MarkerAndColor[] = [];


  ngAfterViewInit(): void {

    if(!this.divMap) throw 'This HTML element was not found';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      minZoom: 2,
      });

      // const markerHTML = document.createElement('div');
      // markerHTML.innerHTML = 'Rodrigo Martinez';
      // const marker = new Marker({ color: 'red', element: markerHTML, }).setLngLat(this.currentLngLat).addTo(this.map);
  }

  createMarker(){
    if(!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker( lngLat: LngLat, color: string = 'white') {
    if(!this.map) return;

    const marker = new Marker({
      color,
      draggable: true,
    }).setLngLat(lngLat).addTo(this.map);

    this.markers.push({color, marker});
  }

  deleteMarker(index : number){
    this.markers[index].marker.remove();
    this.markers.splice(index,1)
  }

}
