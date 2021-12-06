import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'ac-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() coord: [number, number] = [45.40797, 11.88586];
  @Input() zoom: number = 10;
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: this.coord,
      zoom: this.zoom,
    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    var marker = L.marker(this.coord).addTo(this.map);

  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    }
}
