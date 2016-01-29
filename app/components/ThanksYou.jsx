import React from 'react';

var ThanksYou = React.createClass ({
    render() {
        return (
            <div className="container">
                <div className="row tk-header">
                    <img className="img-responsive img-center bigimg hidden-xs" src={require("../photos/tk-header.png")}/>
                    <img className="img-responsive img-center smallimg visible-xs" src={require("../photos/tk-headersmall.png")}/>
                </div>
                <div className="row tk-main">
                    <div className="col-xs-12 smallspace"></div>
                    <div className="col-xs-10 col-xs-offset-1">
                        <h4 className="dblue text-center bold">SUNRISE VIỆT NAM TỰ HÀO LÀ NHÀ TƯ VẤN HỌC BỔNG, HỖ TRỢ
                            TÀI CHÍNH TRUNG HỌC PHỔ THÔNG HÀNG ĐẦU</h4>
                    </div>
                </div>
                <div className="space"></div>
                <div className="main-info">
                    <div className="row ft-r1">
                        <div className="col-md-4 col-md-offset-0 col-sm-4 col-sm-offset-0 col-xs-8 col-xs-offset-2">
                            <p className="dred"><strong>TRỤ SỞ CHÍNH SUNRISE VIETNAM</strong></p>

                            <p style={{"fontSize" : "14px"}}>
                                <img src={require("../photos/tk-home.png")}/>&nbsp; 86 Cửa Bắc - Ba Đình - Hà Nội<br/>
                                <img src={require("../photos/tk-mobile.png")}/>&nbsp;&nbsp; Tel: (84-4) 3722.4878 -
                                3722.4898<br/>
                                <img src={require("../photos/tk-printer.png")}/>&nbsp;&nbsp;Fax: (84-4) 3722.4855</p>
                        </div>
                        <div className="col-md-4 col-md-offset-0 col-sm-4 col-sm-offset-0 col-xs-8 col-xs-offset-2">
                            <p className="dred"><strong>VĂN PHÒNG HẢI PHÒNG</strong></p>

                            <p style={{"fontSize" : "14px"}}>
                                <img src={require("../photos/tk-home.png")}/>&nbsp; 29 Nguyễn Trãi - Ngô Quyền <br/>
                                <img src={require("../photos/tk-mobile.png")}/>&nbsp;&nbsp; Tel: (84-31) 2640689 -
                                3653269 <br/>
                                <img src={require("../photos/tk-printer.png")}/>&nbsp;&nbsp;Fax: (84-31) 3732895
                            </p>
                        </div>

                        <div
                            className="col-md-4 col-md-offset-0 col-sm-4 col-sm-offset-0 col-xs-8 col-xs-offset-2">
                            <p className="dred"><strong>VĂN PHÒNG HỒ CHÍ MINH</strong></p>

                            <p style={{"fontSize" : "14px"}}>
                                <img src={require("../photos/tk-home.png")}/>&nbsp; Lầu 7, Tòa nhà Thanh
                                Dung, số 179 Nguyễn Cư Trinh, Phường Nguyễn Cư Trinh, Q.1 <br/>
                                <img src={require("../photos/tk-mobile.png")}/>&nbsp;&nbsp; Tel: (84-8)
                                38370176 - 38370226 <br/>
                                <img src={require("../photos/tk-printer.png")}/>&nbsp;&nbsp;Fax: (84-8) 38360940</p>
                        </div>
                    </div>
                </div>

                </div>
                )
                }
                })

module.exports = ThanksYou;