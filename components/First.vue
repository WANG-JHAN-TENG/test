<template>
  <v-app>
      <v-container>
          <h1>{{ $t('greeting') }}</h1>
          <h1>Fare well.</h1>
          <v-text-field
            v-model="setDate"
            type="date"
          ></v-text-field>
          <v-btn
            @click="getTrainInfo"
            color="deep-purple"
            dark
          >
            prepare
          </v-btn>
          <v-btn
            @click="setTrainInfo"
            color="teal"
            dark
          >
            update
          </v-btn>
      </v-container>
      <v-container>
          <v-text-field
            v-model="date"
            type="date"
          >
          </v-text-field>
          <v-text-field
            v-model="depart"
            label="depart"
          >
          </v-text-field>
          <v-text-field
            v-model="arrival"
            label="arrival"
          >
          </v-text-field>
          <v-btn
            @click="findTrain"
          >
             search
          </v-btn>
      </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import {
  getDatabase, ref, child, get, set,
} from 'firebase/database';
import { GetAuthorizationHeader } from '~/assets/Authorization.js';

export default {
  data() {
    return {
      setDate: '',
      info: {},
      // searchItems: [
      //   '0803', '0609', '0813', '0125', '0829', '0141', '0845', '0853', '0861', '0295',
      //   '0802', '0610', '0814', '0630', '0830', '0654', '0846', '0854', '0862', '0294',
      // ],
      searchItems: ['0803'],
      date: '',
      depart: '',
      arrival: '',
      train0990: {
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1000: {
        end0990: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1010: {
        end0990: [],
        end1000: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1020: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1030: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1035: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1040: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1043: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1047: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1050: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1060: [],
        end1070: [],
      },
      train1060: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1070: [],
      },
      train1070: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
      },
    };
  },
  computed: {

  },
  created() {

  },
  updated() {

  },
  methods: {
    async getTrainInfo() {
      for ( let i = 0; i < this.searchItems.length; i++ ) {
        const trainNo = this.searchItems[i];
        const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/GeneralTimetable/TrainNo/${trainNo}?%24top=30&%24format=JSON`;
        axios.get(
          url,
          { headers: GetAuthorizationHeader() },
        )
          .then( ( response ) => {
            const trainInfo = response.data[0].GeneralTimetable;
            console.log( trainInfo );
            this.setAllDate( trainInfo );
          } );
      }
      alert( 'success' );
    },
    // setAllDate( trainInfo ) {
    //   this.info = {
    //     start0990: this.set0990( trainInfo ),
    //     start1000: this.set1000( trainInfo ),
    //     start1010: this.set1010( trainInfo ),
    //     start1020: this.set1020( trainInfo ),
    //     start1030: this.set1030( trainInfo ),
    //     start1035: this.set1035( trainInfo ),
    //     start1040: this.set1040( trainInfo ),
    //     start1043: this.set1043( trainInfo ),
    //     start1047: this.set1047( trainInfo ),
    //     start1050: this.set1050( trainInfo ),
    //     start1060: this.set1060( trainInfo ),
    //     start1070: this.set1070( trainInfo ),
    //   };
    // },
    setAllDate( trainInfo ) {
      this.info = {
        start0990: this.setTrain( trainInfo, this.train0990, '0990' ),
        start1000: this.setTrain( trainInfo, this.train1000, '1000' ),
        start1010: this.setTrain( trainInfo, this.train1010, '1010' ),
        start1020: this.setTrain( trainInfo, this.train1020, '1020' ),
        start1030: this.setTrain( trainInfo, this.train1030, '1030' ),
        start1035: this.setTrain( trainInfo, this.train1035, '1035' ),
        start1040: this.setTrain( trainInfo, this.train1040, '1040' ),
        start1043: this.setTrain( trainInfo, this.train1043, '1043' ),
        start1047: this.setTrain( trainInfo, this.train1047, '1047' ),
        start1050: this.setTrain( trainInfo, this.tarin1050, '1050' ),
        start1060: this.setTrain( trainInfo, this.train1060, '1060' ),
        start1070: this.setTrain( trainInfo, this.train1070, '1070' ),
      };
    },
    setTrain( trainInfo, data, value ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === value ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 && item.OriginStopTime.DepartureTime !== '' ) {
        this.insertTrainInfo( stops, item, data, value );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 && item.OriginStopTime.DepartureTime !== '' ) {
        this.insertTrainInfo2( stops, item, data, value );
      }
      return data;
    },
    set0990( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '0990' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      this.insertTrainInfo( stops, item, this.train0990, '0990' );
      return this.train0990;
    },
    set1000( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1000' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        this.insertTrainInfo( stops, item, this.train1000, '1000' );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        this.insertTrainInfo2( stops, item, this.train1000, '1000' );
      }
      return this.train1000;
    },
    set1010( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1010' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        this.insertTrainInfo( stops, item, this.train1010, '1010' );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        this.insertTrainInfo2( stops, item, this.train1010, '1010' );
      }
      return this.train1010;
    },
    set1020( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1020' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        this.insertTrainInfo( stops, item, this.train1020, '1020' );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        this.insertTrainInfo2( stops, item, this.train1020, '1020' );
      }
      return this.train1020;
    },
    set1030( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1030' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        this.insertTrainInfo( stops, item, this.train1030, '1030' );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        this.insertTrainInfo2( stops, item, this.train1030, '1030' );
      }
      return this.train1030;
    },
    set1035( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1035' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        this.insertTrainInfo( stops, item, this.train1035, '1035' );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        this.insertTrainInfo2( stops, item, this.train1035, '1035' );
      }
      return this.train1035;
    },
    set1040( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1040' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        this.insertTrainInfo( stops, item, this.train1040, '1040' );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        this.insertTrainInfo2( stops, item, this.train1040, '1040' );
      }
      return this.train1040;
    },
    set1043( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1043' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        this.insertTrainInfo( stops, item, this.train1043, '1043' );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        this.insertTrainInfo2( stops, item, this.train1043, '1043' );
      }
      return this.train1043;
    },
    set1047( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1047' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        this.insertTrainInfo( stops, item, this.train1047, '1047' );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        this.insertTrainInfo2( stops, item, this.train1047, '1047' );
      }
      return this.train1047;
    },
    set1050( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1050' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        this.insertTrainInfo( stops, item, this.train1050, '1050' );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        this.insertTrainInfo2( stops, item, this.train1050, '1050' );
      }
      return this.train1050;
    },
    set1060( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1060' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        this.insertTrainInfo( stops, item, this.train1060, '1060' );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        this.insertTrainInfo2( stops, item, this.train1060, '1060' );
      }
      return this.train1060;
    },
    set1070( trainInfo ) {
      const item = {
        trainNo: trainInfo.GeneralTrainInfo.TrainNo,
        trainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === '1070' ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      this.insertTrainInfo2( stops, item, this.train1070, '1070' );
      return this.train1070;
    },
    insertTrainInfo( stops, info, trainInfo, depart ) {
      const train = trainInfo;
      let item = {};
      let stop = {};
      for ( let i = 0; i < stops.length; i++ ) {
        item = JSON.parse( JSON.stringify( info ) );
        stop = stops[i];
        if ( stop.StationID === '1000' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1000.push( item );
        } else if ( stop.StationID === '1010' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1010.push( item );
        } else if ( stop.StationID === '1020' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1020.push( item );
        } else if ( stop.StationID === '1030' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1030.push( item );
        } else if ( stop.StationID === '1035' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1035.push( item );
        } else if ( stop.StationID === '1040' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1040.push( item );
        } else if ( stop.StationID === '1043' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1043.push( item );
        } else if ( stop.StationID === '1047' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1047.push( item );
        } else if ( stop.StationID === '1050' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1050.push( item );
        } else if ( stop.StationID === '1060' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1060.push( item );
        } else if ( stop.StationID === '1070' && stop.StationID > depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1070.push( item );
        }
      }
      return train;
    },
    insertTrainInfo2( stops, info, trainInfo, depart ) {
      const train = trainInfo;
      let item = {};
      let stop = {};
      for ( let i = 0; i < stops.length; i++ ) {
        item = JSON.parse( JSON.stringify( info ) );
        stop = stops[i];
        if ( stop.StationID === '1000' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1000.push( item );
        } else if ( stop.StationID === '1010' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1010.push( item );
        } else if ( stop.StationID === '1020' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1020.push( item );
        } else if ( stop.StationID === '1030' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1030.push( item );
        } else if ( stop.StationID === '1035' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1035.push( item );
        } else if ( stop.StationID === '1040' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1040.push( item );
        } else if ( stop.StationID === '1043' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1043.push( item );
        } else if ( stop.StationID === '1047' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1047.push( item );
        } else if ( stop.StationID === '1050' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1050.push( item );
        } else if ( stop.StationID === '1060' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1060.push( item );
        } else if ( stop.StationID === '1070' && stop.StationID < depart ) {
          item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
          train.end1070.push( item );
        }
      }
      return train;
    },
    async setTrainInfo() {
      const firebaseConfig = {
        apiKey: 'AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY',
        authDomain: 'rail-nuxt.firebaseapp.com',
        databaseURL: 'https://rail-nuxt-default-rtdb.firebaseio.com',
        projectId: 'rail-nuxt',
        storageBucket: 'rail-nuxt.appspot.com',
        messagingSenderId: '85380246039',
        appId: '1:85380246039:web:82e4bcb2bdc6ed35f5ca52',
        measurementId: 'G-4HSRY9S9HE',
      };
      const result = confirm( 'set?' );
      if ( result ) {
        const db = getDatabase( initializeApp( firebaseConfig ) );
        set( ref( db, `trainInfo/${this.setDate}` ), {
          info: this.info,
        } )
          .then( () => {
            alert( 'success' );
          } )
          .catch( ( e ) => {
            alert( 'failed' );
            console.error( e );
          } );
      }
    },
    findTrain() {
      const firebaseConfig = {
        apiKey: 'AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY',
        authDomain: 'rail-nuxt.firebaseapp.com',
        databaseURL: 'https://rail-nuxt-default-rtdb.firebaseio.com',
        projectId: 'rail-nuxt',
        storageBucket: 'rail-nuxt.appspot.com',
        messagingSenderId: '85380246039',
        appId: '1:85380246039:web:82e4bcb2bdc6ed35f5ca52',
        measurementId: 'G-4HSRY9S9HE',
      };
      const dbRef = ref( getDatabase( initializeApp( firebaseConfig ) ) );
      get( child( dbRef, `trainInfo/${this.date}/info/start${this.depart}/end${this.arrival}` ) )
        .then( ( snapshot ) => {
          console.log( snapshot.val() );
        } )
        .catch( ( error ) => {
          console.log( error );
          alert( '查無資訊' );
        } );
    },

  },
};
</script>

<style>

</style>
