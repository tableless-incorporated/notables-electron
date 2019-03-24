import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() icon = 'warning';
  @Input() size = '24px';
  @Input() color: ThemePalette = 'primary';
  constructor() { }

  ngOnInit() {

  }

}
