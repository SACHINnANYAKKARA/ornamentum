import { Component } from '@angular/core';

import {
  DataTableComponent,
  MenuPosition,
  DataRow
} from '../../../library';

import { Observable } from 'rxjs/Observable';

import { DataStorageService } from '../../services/data-storage.service';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

declare function require(url: string);

const data = require('../../data/grid-data.json');

/**
 * Interface representing column configurations.
 *
 * @interface ColumnConf.
 */
export interface ColumnConf {
  width?: number;
  title?: string;
  filterPlaceholder?: string;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  visible?: boolean;
}

@Component({
  providers: [DataStorageService],
  selector: 'app-data-table-example-component',
  templateUrl: './data-table-example.component.html',
  styleUrls: ['./data-table-example.component.scss']
})
export class DataTableExampleComponent {
  public MenuPosition = MenuPosition;

  private static tableConfigurationStorageKeyName = 'app_table_init_conf';
  private static columnConfigurationStorageKeyName = 'app_column_init_conf';

  public initialTableConf: {
    autoFetch: boolean;
    showIndexColumn: boolean;
    rowSelectable: boolean;
    multiColumnSortable: boolean;
    expandableRows: boolean;
    remoteDataFetch: boolean;
  };

  public initialColumnConf: {
    multiSelectFilter1: boolean;
    multiSelectFilter2: boolean;
    multiSelectFilter3: boolean;
    multiSelectFilter4: boolean;
    multiSelectFilter5: boolean;
    multiSelectFilter6: boolean;
    multiSelectFilter7: boolean;
    multiSelectFilter8: boolean;
    multiSelectFilter9: boolean;
  };

  public selectedDataItems: any;

  public gridTitle: string;
  public filterDebounce: boolean;
  public multiRowSelectable: boolean;
  public pageable: boolean;
  public selectOnRowClick: boolean;
  public showHeader: boolean;
  public showLoadingSpinner: boolean;
  public showSubstituteRows: boolean;
  public filterDebounceTime: number;
  public indexColumnTitle: string;
  public contentHeight: string;
  public limit: number;
  public page: number;
  public expandOnRowClick: boolean;

  public dataTableComponent: DataTableComponent;

  public firstColConf: ColumnConf;
  public secondColConf: ColumnConf;
  public thirdColConf: ColumnConf;
  public forthColConf: ColumnConf;
  public fifthColConf: ColumnConf;
  public sixthColConf: ColumnConf;
  public seventhColConf: ColumnConf;
  public eighthColConf: ColumnConf;
  public ninthColConf: ColumnConf;
  public tenthColConf: ColumnConf;

  public items: Observable<any>; // = new Subject();

  constructor(private dataStorageService: DataStorageService, private http: HttpClient) {
    this.initialTableConf = this.dataStorageService.get(DataTableExampleComponent.tableConfigurationStorageKeyName) ||
      {
        autoFetch: true,
        showIndexColumn: true,
        rowSelectable: true,
        multiColumnSortable: false,
        expandableRows: true,
        remoteDataFetch: false
      };

    this.initialColumnConf = this.dataStorageService.get(DataTableExampleComponent.columnConfigurationStorageKeyName) ||
      {
        multiSelectFilter1: false,
        multiSelectFilter2: false,
        multiSelectFilter3: false,
        multiSelectFilter4: false,
        multiSelectFilter5: false,
        multiSelectFilter6: false,
        multiSelectFilter7: false,
        multiSelectFilter8: false,
        multiSelectFilter9: false
      };

    this.gridTitle = 'Stations Details in the New York City Bike Sharing Initiative';
    this.filterDebounce = true;
    this.multiRowSelectable = false;
    this.pageable = true;
    this.selectOnRowClick = true;
    this.showHeader = true;
    this.showLoadingSpinner = true;
    this.showSubstituteRows = true;
    this.filterDebounceTime = 500;
    this.contentHeight = '300px';
    this.indexColumnTitle = '#';
    this.limit = 10;
    this.page = 1;
    this.expandOnRowClick = false;

    this.firstColConf = {
      width: 80,
      title: 'ID',
      sortable: true,
      filterable: true,
      filterPlaceholder: '',
      resizable: false,
      visible: true
    };
    this.secondColConf = {
      title: 'Station Name',
      sortable: true,
      filterable: true,
      filterPlaceholder: '',
      resizable: false,
      visible: true
    };
    this.thirdColConf = {
      width: 120,
      title: 'Latitude',
      sortable: true,
      filterable: true,
      filterPlaceholder: '',
      resizable: false,
      visible: true
    };
    this.forthColConf = {
      width: 120,
      title: 'Longitude',
      sortable: true,
      filterable: true,
      filterPlaceholder: '',
      resizable: false,
      visible: true
    };
    this.fifthColConf = {
      width: 120,
      title: 'Available Docks',
      sortable: true,
      filterable: true,
      filterPlaceholder: '',
      resizable: false,
      visible: true
    };
    this.sixthColConf = {
      width: 110,
      title: 'Total Docks',
      sortable: true,
      filterable: true,
      filterPlaceholder: '',
      resizable: false,
      visible: true
    };
    this.seventhColConf = {
      width: 100,
      title: 'Status',
      sortable: true,
      filterable: true,
      filterPlaceholder: '',
      resizable: false,
      visible: true
    };
    this.eighthColConf = {
      width: 120,
      title: 'Available Bikes',
      sortable: true,
      filterable: true,
      filterPlaceholder: '',
      resizable: false,
      visible: true
    };
    this.ninthColConf = {
      width: 180,
      title: 'Last Communication Time',
      sortable: true,
      filterable: true,
      filterPlaceholder: '',
      resizable: false,
      visible: true
    };
    this.tenthColConf = {
      width: 100,
      title: 'Action',
      resizable: false,
      visible: true
    };

    // let count = 0;
    // setInterval(() => {
    //   this.items.next(data.stationBeanList.slice(0, count + 50));
    //   count += 50;
    // }, 2000);
    // this.items = Observable.of(data.stationBeanList);

    this.items = this.http.get('http://localhost:3334/test/test');
  }

  /**
   * On data table initStream event callback.
   * @param {DataTableComponent} dataTableComponent Data table reference.
   */
  public onInit(dataTableComponent: DataTableComponent): void {
    this.dataTableComponent = dataTableComponent;
  }

  /**
   * On edit functionality.
   * @param item
   * @param event
   */
  public onEdit(item: any, event: any): void {
    event.stopPropagation();
  }

  /**
   * Responsible for reloading page after updating initial table loading configurations.
   * Store all the updated configurations in the local storage.
   */
  public reloadTableConfigurations(): void {
    this.dataStorageService.set(DataTableExampleComponent.tableConfigurationStorageKeyName, this.initialTableConf);
    location.reload();
  }

  /**
   * Responsible for reloading page after updating initial column loading configurations.
   * Store all the updated configurations in the local storage.
   */
  public reloadColumnConfigurations(): void {
    this.dataStorageService.set(DataTableExampleComponent.columnConfigurationStorageKeyName, this.initialColumnConf);
    location.reload();
  }

  public onRowBind(dataRow: DataRow): void {
    dataRow.disabled = dataRow.index === 1;
  }

  public onRowSelectedStateChange(selected: any | any[]) {
    console.log(selected);
  }
}
