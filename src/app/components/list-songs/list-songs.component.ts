import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { Song } from '../models/song.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'list-songs',
  templateUrl: './list-songs.component.html',
  styleUrls: ['./list-songs.component.scss']
})
export class ListSongsComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;

  columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Path', field: 'path', sortable: true, filter: true },
    { headerName: 'Gain', field: 'gain', sortable: true, filter: true },
    { headerName: 'Pan', field: 'pan', sortable: true, filter: true },
    { headerName: 'Muted', field: 'muted', sortable: true, filter: true },
  ];

  public rowData: Song;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('https://api.myjson.com/bins/1y7d1')
      .pipe(
        map((row: any) => row.tracks)
      ).subscribe((res: Song) => {
        this.rowData = res;
      });
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log('selectedData', selectedData);
    const selectedDataStringPresentation = selectedData.map(node => node.name + ' ' + node.path).join(', ');
    alert('selected:' + selectedDataStringPresentation);
  }
}
