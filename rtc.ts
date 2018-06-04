/**
* Makecode block for real time clock
*/

namespace SGBotic{
    
    let rtc_I2C_ADDR = 104  //0x68
    let rtc_REG_SECOND = 0
    let rtc_REG_MINUTE = 1
    let rtc_REG_HOUR = 2
    let rtc_REG_DAYOFWEEK = 3
    let rtc_REG_DAY = 4
    let rtc_REG_MONTH = 5
    let rtc_REG_YEAR = 6
    
    let rtc_ALM1REG_SECOND = 7
    let rtc_ALM1REG_MINUTE = 8
    let rtc_ALM1REG_HOUR = 9
    let rtc_ALM1REG_DAY = 10
    
    let rtc_ALM2REG_MINUTE = 11
    let rtc_ALM2REG_HOUR = 12
    let rtc_ALM2REG_DAY = 13
    
    let rtc_REG_CTRL = 14   //0x0E
    let rtc_REG_STATUS = 15    //0x0F
     
    let rtc_TEMP_MSB = 17   //integer portion of temp
    let rtc_TEMP_LSB = 18   //fractional portion of temp
    let DAYS_ARRAY = [31,28,31,30,31,30,31,31,30,31,30,31]
    let DOW_ARRAY = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4]
    
    export enum RTCREGISTERS{
        //%block="ALM1REG_SECOND"
        ALM1REG_SECOND = 1,
        //%block="ALM1REG_MINUTE"
        ALM1REG_MINUTE = 2,
        //%block="ALM1REG_HOUR"
        ALM1REG_HOUR = 3,
        //%block="ALM1REG_DAY"
        ALM1REG_DAY = 4,
        //%block="ALM2REG_MINUTE"
        ALM2REG_MINUTE = 5,
        //%block="ALM2REG_HOUR"
        ALM2REG_HOUR = 6,
        //%block="ALM2REG_DAY"
        ALM2REG_DAY = 7,
        //%block="REG_CTRL"
        REG_CTRL = 8,
        //%block="REG_STATUS"
        REG_STATUS = 9
    }

     export enum TrueFalse{
    
        //%block="True"
        True = 1,
        //%block="False"
        False = 0
    }
    
    export enum startStop{
    
        //%block="Start"
        Start = 1,
        //%block="Stop"
        Stop = 0
    }
    
    export enum alarmNumber{
    
        //%block="Alarm1"
        Alarm1 = 1,
        //%block="Alarm2"
        Alarm2 = 2
    }
    alarmNumber
    
    
    /**
     * set current Date and Time
     * @param year is the Year to be set, eg: 2018
     * @param month is the Month to be set, eg: 5
     * @param day is the day to be set, eg: 22
     * @param hour is the Hour to be set, eg: 10
     * @param minute is the Minute to be set, eg: 39
     * @param second is the Second to be set, eg: 1
     */
     //% subcategory=Real-Time-Clock
    //% blockId="rtc_setDateTime" block="set real time clock|year %year|month %month|day %day|hour %hour|minute %minute|second %second"
    //% weight=100 blockExternalInputs=true blockGap 3
    //% month.min=1 month.max=12
    //% day.min=1 day.max=31
    //% hour.min=1 hour.max=24
    //% minute.min=0 minute.max=60
    //% second.min=0 second.max=60
    export function rtc_setDateTime(year: number, month: number, day: number, hour: number, minute: number, second: number): void {
       writeRegister(rtc_REG_YEAR, dec2bcd(year - 2000))
       writeRegister(rtc_REG_MONTH, dec2bcd(month))
       writeRegister(rtc_REG_DAY, dec2bcd(day))
       writeRegister(rtc_REG_HOUR, dec2bcd(hour))
       writeRegister(rtc_REG_MINUTE, dec2bcd(minute))
       writeRegister(rtc_REG_SECOND, dec2bcd(second))
       writeRegister(rtc_REG_DAYOFWEEK, dec2bcd(getDOW(year, month, day)))     
    }
   
   
   /**
     * set Alarm1
     * @param alarm1Hour is the alarm1 Hour to be set, eg: 1
     * @param alarm1Minute is the alarm1 Minute to be set, eg: 2
     * @param alarm1Second is the alarm1 Second to be set, eg: 3
     */
     //% subcategory=Real-Time-Clock
    //% blockId="rtc_setAlarm1" block="set Alarm1|hour %aalarm1Hour|minute %alarm1Minute|second %alarm1Second"
    //% weight=99 blockExternalInputs=true blockGap 3
    //% alarm1Hour.min=1 alarm1Hour.max=24
    //% alarm1Minute.min=0 alarm1Minute.max=60
    //% alarm1Second.min=0 alarm1Second.max=60
    export function rtc_setAlarm1(alarm1Hour: number, alarm1Minute: number, alarm1Second: number): void {
       writeRegister(rtc_ALM1REG_DAY, dec2bcd(0x80))   //repeat when h, m, s match
       writeRegister(rtc_ALM1REG_HOUR, dec2bcd(alarm1Hour))
       writeRegister(rtc_ALM1REG_MINUTE, dec2bcd(alarm1Minute))
       writeRegister(rtc_ALM1REG_SECOND, dec2bcd(alarm1Second))   
       let alarmFlagStatus = readRegister(rtc_REG_STATUS)
       writeRegister(rtc_REG_STATUS, (alarmFlagStatus & 0b11111110))  //clear alarm flag
    }
    
 
   /**
     * set Alarm2
     * @param alarm2Hour is the alarm2 Hour to be set, eg: 1
     * @param alarm2Minute is the alarm2 Minute to be set, eg: 2
     */
     //% subcategory=Real-Time-Clock
    //% blockId="rtc_setAlarm2" block="set Alarm2|hour %alarm2Hour|minute %alarm2Minute"
    //% weight=98 blockExternalInputs=true blockGap 8
    //% alarm2Hour.min=1 alarm2Hour.max=24
    //% alarm2Minute.min=0 alarm2Minute.max=60
    export function rtc_setAlarm2(alarm2Hour: number, alarm2Minute: number): void {
       writeRegister(rtc_ALM2REG_DAY, dec2bcd(0x80))   //repeat when h, m match
       writeRegister(rtc_ALM2REG_HOUR, dec2bcd(alarm2Hour))
       writeRegister(rtc_ALM2REG_MINUTE, dec2bcd(alarm2Minute))
       let alarmFlagStatus = readRegister(rtc_REG_STATUS)
       writeRegister(rtc_REG_STATUS, (alarmFlagStatus & 0b11111101)) //clear alarm flag
    }
    
   
    
     /**
     * Get alarm status. Function returns 1 if activated
     */
     //% subcategory=Real-Time-Clock
    //% blockId="rtc_alarmStatus" block="%alarmStatID |status"
    //% weight=60 blockGap 8
    export function rtc_alarmStatus(alarmStatID: alarmNumber): number {
    
        let alarmFlagStatus: number
        
        alarmFlagStatus = readRegister(rtc_REG_STATUS)
        
        if (alarmStatID === alarmNumber.Alarm1)
        {
            writeRegister(rtc_REG_STATUS, (alarmFlagStatus & 0b11111110))
            return (alarmFlagStatus & 0b00000001)
        
        }else
        {
            writeRegister(rtc_REG_STATUS, (alarmFlagStatus & 0b11111101))
            return ((alarmFlagStatus & 0b00000010) >> 1)
        }
    }
    
     /**
     * get register value. For debug purpose.
     */
     //% subcategory=Real-Time-Clock
    //% blockId="rtc_getRegister" block="get register %registerID"
    //% weight=50 blockGap 8
    export function rtc_getRegister(registerID: RTCREGISTERS): number {
        
        if (registerID === RTCREGISTERS.ALM1REG_SECOND)
        {
           return (bcd2dec(readRegister(rtc_ALM1REG_SECOND)))
        
        }else if (registerID === RTCREGISTERS.ALM1REG_MINUTE)
        {
           return (bcd2dec(readRegister(rtc_ALM1REG_MINUTE)))
        
        }else if (registerID === RTCREGISTERS.ALM1REG_HOUR)
        {
           return (bcd2dec(readRegister(rtc_ALM1REG_HOUR)))
        
        }else if (registerID === RTCREGISTERS.ALM1REG_DAY)
        {
           return (bcd2dec(readRegister(rtc_ALM1REG_DAY)))
        
        }else if (registerID === RTCREGISTERS.ALM2REG_MINUTE)
        {
           return (bcd2dec(readRegister(rtc_ALM2REG_MINUTE)))
        
        }else if (registerID === RTCREGISTERS.ALM2REG_HOUR)
        {
           return (bcd2dec(readRegister(rtc_ALM2REG_HOUR)))
        
        }else if (registerID === RTCREGISTERS.ALM2REG_DAY)
        {
           return (bcd2dec(readRegister(rtc_ALM2REG_DAY)))
        
        }else if (registerID === RTCREGISTERS.REG_CTRL)
        {
           return (readRegister(rtc_REG_CTRL))
        
        }else if (registerID === RTCREGISTERS.REG_STATUS)
        {
           return (readRegister(rtc_REG_STATUS))
        }else
        {
            return 0
        }
    }
    
        
    /**
     * write register
     */
    function writeRegister(reg: number, dat: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = dat
        pins.i2cWriteBuffer(rtc_I2C_ADDR, buf)
    }

    /**
     * read register
     */
    function readRegister(reg: number): number {
        pins.i2cWriteNumber(rtc_I2C_ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(rtc_I2C_ADDR, NumberFormat.UInt8BE)
    }

    
    /**
     * get Year
     */
    //% subcategory=Real-Time-Clock
    //% blockId="rtc_getYear" block="year"
    //% weight=90 blockGap=3 
    export function getYear(): number {
        return (bcd2dec(readRegister(rtc_REG_YEAR)) + 2000)
    }
    
    /**
     * get Month
     */
    //% subcategory=Real-Time-Clock
    //% blockId="rtc_getMonth" block="month"
    //% weight=89 blockGap=3 
    export function getMonth(): number {
        return bcd2dec(readRegister(rtc_REG_MONTH))
    }
    
    /**
     * get Day of week
     */
    //% subcategory=Real-Time-Clock
    //% blockId="rtc_getDayOfWeek" block="day of week"
    //% weight=83 blockGap=15 
    export function getDayOfWeek(): number {
        return bcd2dec(readRegister(rtc_REG_DAYOFWEEK))
    }
    
     /**
     * get day
     */
    //% subcategory=Real-Time-Clock 
    //% blockId="rtc_getDay" block="Day"
    //% weight=87 blockGap=15 
    export function getDay(): number {
        return bcd2dec(readRegister(rtc_REG_DAY))
    }
    
    /**
     * get Hour
     */
    //% subcategory=Real-Time-Clock 
    //% blockId="rtc_getHour" block="hour"
    //% weight=86 blockGap=3
    export function getHour(): number {
        return bcd2dec(readRegister(rtc_REG_HOUR))
    }
    
    /**
     * get Minute
     */
    //% subcategory=Real-Time-Clock 
    //% blockId="rtc_getMinute" block="minute"
    //% weight=85 blockGap=3 
    export function getMinute(): number {
        return bcd2dec(readRegister(rtc_REG_MINUTE))
    }
    
    /**
     * get Second
     */
    //% subcategory=Real-Time-Clock 
    //% blockId="rtc_getSecond" block="second"
    //% weight=84 blockGap=15 
    export function getSecond(): number {
        return bcd2dec(readRegister(rtc_REG_SECOND))
    }
    
    
    /**
     * get Temperature
     */
    //% subcategory=Real-Time-Clock 
    //% blockId="rtc_getTemperature" block="temperature"
    //% weight=70 blockGap=15 
    export function getTemperature(): number {
        let tempValue: number
        let tempFraction: number
        
        tempValue = readRegister(rtc_TEMP_MSB)
        tempFraction = readRegister(rtc_TEMP_LSB)
        if (tempFraction >= 0x80)
            return (tempValue + 1)
        else
            return tempValue     
    }
    
    
   /**
    * get day of week
    */
    export function getDOW(y: number, m: number, d: number): number
    {     
        let dowValue: number   
    
        if(m < 3)
            y = y - 1
        
        dowValue = (y + y/4 - y/100 + y/400 + DOW_ARRAY[m-1] + d) % 7

        if (dowValue === 0)
        {
            return 7
        }else
       
            return dowValue
    }
    
    
   /**
    * bcd2dec -- convert binary-coded decimal (BCD) to decimal
    */
    export function bcd2dec(bcd: number): number{
        
	   return  ((( bcd / 0x10) * 10 ) + ( bcd % 0x10 ))
    }
  
  /**
   * dec2bcd -- convert decimal to binary-coded decimal (BCD)
   */
    export function dec2bcd(dec: number): number
    {
	   return ((( dec / 10 ) * 0x10 ) + ( dec % 10 ))
    }
  
}