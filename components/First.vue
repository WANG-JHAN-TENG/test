<template>
  <div class="container">
      <div class="seatTitle">
        <h2>請選擇車位</h2>
      </div>
      <div class="seatChoice">
          <h3>列車車頭</h3>
          <div class="oneTrain">
              <div class="seat" v-for="(seat, index) in seats" :key="seat.index">
                    <div class="selectCar" v-if="selectedCar == index">
                        <div class="seatNum" v-for="seatNum in seat" :key="seatNum.index">
                            <label><input type="checkbox" name="label" :value="seatNum" v-model="selectedSeats">
                                <span class="round button">
                                  {{seatNum}}
                                </span>
                            </label>
                        </div>
                    </div>
              </div>
          </div>
        <div class="carNo">
            <div class="singleCar" v-for="(carNo, index) in carNos" :key="carNo.index" @click="keyInCarNo(index)">
              {{carNo}}
            </div>
        </div>
        <div class="selectedCar">
          車廂 : {{showSelectedCar}}
        </div>
      </div>
      <div class="selectedSeats">
          您選擇 
          <div class="selectedSeat" v-for="selectedSeat in selectedSeats" :key="selectedSeat.index">
              {{selectedSeat}}
          </div>
          號座位
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seats: [
        ["A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", ],
        ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "B20", ],
        ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C20", ],
        ["D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19", "D20", ],
        ["E01", "E02", "E03", "E04", "E05", "E06", "E07", "E08", "E09", "E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18", "E19", "E20", ],
        ["F01", "F02", "F03", "F04", "F05", "F06", "F07", "F08", "F09", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", ],
        ["G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11", "G12", "G13", "G14", "G15", "G16", "G17", "G18", "G19", "G20", ],
        ["H01", "H02", "H03", "H04", "H05", "H06", "H07", "H08", "H09", "H10", "H11", "H12", "H13", "H14", "H15", "H16", "H17", "H18", "H19", "H20", ],
        ["I01", "I02", "I03", "I04", "I05", "I06", "I07", "I08", "I09", "I10", "I11", "I12", "I13", "I14", "I15", "I16", "I17", "I18", "I19", "I20", ],
        ["J01", "J02", "J03", "J04", "J05", "J06", "J07", "J08", "J09", "J10", "J11", "J12", "J13", "J14", "J15", "J16", "J17", "J18", "J19", "J20", ],
      ],
      carNos: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      selectedCar: "0",
      showSelectedCar: "A",
      selectedSeats:[],
    }
  },
  updated(){
    if(this.selectedSeats.length > 10){
      this.selectedSeats.pop();
    }
    this.showSelectedCar = this.carNos[this.selectedCar]
  },
  methods:{
    keyInCarNo(index){
      this.selectedCar = index;
    }
  },
}
</script>

<style>
  .seatTitle{
    text-align: center;
  }
  .seatChoice{
    margin: 5% auto;
    padding: 3% auto;
    width: 70%;
    border: 2px solid #ccc;
    text-align: center;
  }
  .seatChoice h3{
    display: inline-block;
    margin: 2% 0 0 0;
  }
  .oneTrain{
    margin: 3% auto;
  }
  .selectCar{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .seatNum{
    margin: 3% 2%;
    height: 6vh;
    width: 15%;
  }
  .selectCar :nth-child(2){
    margin-right: 12%;
  }
  .selectCar :nth-child(6){
    margin-right: 12%;
  }
  .selectCar :nth-child(10){
    margin-right: 12%;
  }
  .selectCar :nth-child(14){
    margin-right: 12%;
  }
  .selectCar :nth-child(18){
    margin-right: 12%;
  }
  .oneTrain input[type="checkbox"] {
    display: none; 
  }
  .oneTrain input:checked + .button {
    background: #5e7380; 
    color: #fff;
  }
  .oneTrain .button {
    display: inline-block;
    transform: translateX(-33%);
    background: #8ecbcf;
    padding: 100% 120%; 
    color: #333; 
    cursor: pointer;
  }
  .oneTrain .button:hover {
    background: #8ecbcf7c; 
  }
  .oneTrain .round {
    border-radius: 5px; 
  }
  #selected{
    color: rgb(68, 105, 224);
  }
  .carNo{
    margin: 2% 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .singleCar{
    margin: 0 2%;
    font-size: normal;
    cursor: pointer;
    color: rgb(0, 0, 0);
    transition: 0.2s ease all;
  }
  .singleCar:hover{
    color: rgb(224, 228, 235);
    background: rgb(122, 173, 231);
    border-radius: 25%;
  }
  .selectedSeats{
    margin: 2% 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .selectedSeat{
    margin: 0 2%;
  }
</style>
