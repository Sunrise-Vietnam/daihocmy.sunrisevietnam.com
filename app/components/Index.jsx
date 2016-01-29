import React from 'react';

import Modal from 'react-bootstrap-modal';
import _ from 'underscore';
import DDP from 'ddp.js';

let _formObj = {
    isOpenModal: false,
    hovaten: '',
    sodienthoai: '',
    email: '',
    nguoidangkyla: '',
    thanhphodangsong: '',
    chuongtrinh: [],
    thoigianduhoc: '',
    nhucauhoc: '',
    bietchuongtrinhquakenh: []
}

const _eventCode = 'mw2Asjv9B7pl419yd3imj3uu1DMP6TT7';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.clone(_formObj);

        this._openModal = this._openModal.bind(this);
        this._handle_Hovaten = this._handle_Hovaten.bind(this);
        this._handle_Sodienthoai = this._handle_Sodienthoai.bind(this);
        this._handle_Email = this._handle_Email.bind(this);
        this._handle_Nguoidangkyla = this._handle_Nguoidangkyla.bind(this);
        this._handle_Thanhphodangsong = this._handle_Thanhphodangsong.bind(this);
        this._handle_Nhucauhoc = this._handle_Nhucauhoc.bind(this);
        this._handle_Thoigianduhoc = this._handle_Thoigianduhoc.bind(this);
        this._handle_Chuongtrinh = this._handle_Chuongtrinh.bind(this);
        this._handle_Bietchuongtrinhquakenh = this._handle_Bietchuongtrinhquakenh.bind(this);
        this._saveAndCloseModal = this._saveAndCloseModal.bind(this);
    }

    _openModal() {
        this.setState({
            isOpenModal: true
        })
    }

    _saveAndCloseModal() {
        if (this._isFormValid()) {
            let params = {
                eventCode: _eventCode,
                obj: _.omit(this.state, 'isOpenModal')
            }
            let self = this;
            let msgId = this.ddp.method('registerEventGLVH', [params.eventCode, params.obj]);
            this.ddp.on('result',function(msg){
                if(msgId === msg.id && !msg.error){
                    self.setState(_.clone(_formObj));
                    self.props.history.pushState(null,"/thanks-you")
                }
            })
        }
    }

    _resetForm() {
        $('.selectpicker').selectpicker('deselectAll');
    }

    _handle_Hovaten(e) {
        this.setState({
            hovaten: e.target.value
        })
    }

    _handle_Sodienthoai(e) {
        this.setState({
            sodienthoai: e.target.value
        })
    }

    _handle_Email(e) {
        this.setState({
            email: e.target.value
        })
    }

    _handle_Nguoidangkyla(e) {
        this.setState({
            nguoidangkyla: e.target.value
        })
    }

    _handle_Chuongtrinh(e) {
        this.setState({
            chuongtrinh: $(e.target).selectpicker('val')
        })
    }

    _handle_Thanhphodangsong(e) {
        this.setState({
            thanhphodangsong: e.target.value
        })
    }

    _handle_Thoigianduhoc(e) {
        this.setState({
            thoigianduhoc: e.target.value
        })
    }

    _handle_Nhucauhoc(e) {
        this.setState({
            nhucauhoc: e.target.value
        })
    }

    _handle_Bietchuongtrinhquakenh(e) {
        this.setState({
            bietchuongtrinhquakenh: $(e.target).selectpicker('val')
        })
    }

    _isFormValid() {
        let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (this.state.hovaten && regEmail.test(this.state.email) && this.state.sodienthoai && this.state.chuongtrinh && this.state.nguoidangkyla && this.state.thanhphodangsong && this.state.thoigianduhoc && this.state.nhucauhoc && this.state.chuongtrinh.length > 0 && this.state.bietchuongtrinhquakenh.length > 0);
    }

    componentDidMount() {
        let options = {
            endpoint: "ws://system.sunrisevietnam.com/websocket",
            SocketConstructor: WebSocket
        };
        this.ddp = new DDP(options);
        this.ddp.on("connected", function () {
            console.log("Connected to Server...");
        });
    }

    componentDidUpdate() {
        if (this.state.isOpenModal && this.state.isOpenModal === true) {
            var self = this;
            $('.selectpicker').selectpicker().on('loaded.bs.select', function (e) {
                if (e.target.id === 'chuongtrinh') {
                    $(e.target).selectpicker('val', self.state.chuongtrinh);
                } else {
                    $(e.target).selectpicker('val', self.state.bietchuongtrinhquakenh);
                }
            });
        }
    }

    render() {
        let closeModal = () => this.setState({isOpenModal: false});
        let _disabled = {};
        if (!this._isFormValid()) {
            _disabled['disabled'] = 'disabled';
        }
        return (
            <div>
                <header id="header" className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <img width="100%" src={require('../photos/header.png')} className="img-responsive"
                                 id="bgheader"/>
                        </div>
                    </div>
                </header>
                <div className="decobar"></div>
                <div className="container intro gray">
                    <div className="row">
                        <div className="space"></div>
                        <table className="hidden-xs">
                            <tbody>
                            <tr>
                                <td width="25%" className="colintro"><h5>Tại Mỹ có hơn <span
                                    className="bold ablue span-38"><br/>70%</span> sinh viên bản địa nhập học tại các
                                    trường Đại học công lập.</h5>
                                </td>
                                <td width="25%" className="colintro"><h5>Chỉ <span className="bold ablue span-38"><br/>16%</span>
                                    &nbsp;sinh viên nhập học tại các trường Tư thục.</h5>
                                </td>
                                <td width="25%" className="colintro"><h5>Tại Mỹ có hơn <span
                                    className="bold ablue span-38"><br/>500</span> ngành học để lựa chọn và sinh viên
                                    không cần xác nhận ngành theo học cho đến năm 3 Đại học.</h5>
                                </td>
                                <td width="25%" className="colintro"><h5>Và hiện tại, đang có khoảng <span
                                    className="bold ablue span-38">16,000</span> du học sinh
                                    Việt Nam tại Mỹ.</h5></td>
                            </tr>
                            </tbody>
                        </table>
                        <table id="smalltbl" className="visible-xs">
                            <tbody>
                            <tr>
                                <td width="50%" className="colintro"><h5>Tại Mỹ có hơn <span
                                    className="bold ablue">70%</span> sinh viên bản địa
                                    nhập học tại các trường Đại học công lập.</h5></td>
                                <td width="50%" className="colintro colintro-bg"><h5>Chỉ
                                    <span className="bold">16%</span> sinh viên nhập học
                                    tại các trường Tư thục.</h5></td>
                            </tr>
                            <tr>
                                <td width="50%" className="colintro colintro-bg"><h5>Tại
                                    Mỹ có hơn <span className="bold">500</span> ngành
                                    học để lựa chọn và sinh viên không cần xác nhận ngành theo học cho đến năm 3
                                    Đại học.</h5></td>
                                <td width="50%" className="colintro"><h5>Và hiện tại, đang có khoảng <span
                                    className="bold ablue">16,000</span> du học sinh
                                    Việt Nam tại Mỹ.</h5></td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="space"></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1 hidden-xs ablue text-right"><h5 style={{"verticalAlign": "middle"}}>
                            <span className="hidden-xs hidden-sm glyphicon glyphicon-chevron-right"></span><span
                            className="glyphicon glyphicon-chevron-right"></span></h5></div>
                        <div className="col-xs-12 col-sm-10 text-center">
                            <h5 className="ablue bold">BẠN QUAN TÂM ĐẾN CÁC TRƯỜNG ĐẠI HỌC CÔNG LẬP MỸ</h5>
                            <h5 className="ablue bold">HÃY LIÊN HỆ SUNRISE VIETNAM</h5>
                        </div>
                        <div className="col-sm-1 hidden-xs ablue"><h5><span
                            className="glyphicon glyphicon-chevron-left"></span><span
                            className="hidden-xs hidden-sm glyphicon glyphicon-chevron-left"></span></h5></div>
                    </div>
                    <div className="row">
                        <div className="smallspace"></div>
                        <button type="button" className="center-block btn btnreg redbg white" onClick={this._openModal}>
                            <h5>ĐĂNG KÝ</h5></button>
                    </div>
                    <div className="space"></div>
                </div>
                <div className="colorbar-top clbar-red"></div>
                <div id="hinhanh">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                <div className="smallspace"></div>
                                <h4 className="bold">MỘT SỐ HÌNH ẢNH CƠ SỞ VẬT CHẤT</h4>
                                <h4 className="bold">TẠI CÁC TRƯỜNG ĐẠI HỌC CÔNG LẬP</h4>
                                <h5>_______&nbsp;&nbsp;<span className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;
                                    <span className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;<span
                                        className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;_______</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-4"><img className="imgborder img-responsive"
                                                                    src={require("../photos/hinhanh/1.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img className="imgborder img-responsive"
                                                                    src={require("../photos/hinhanh/2.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img className="imgborder img-responsive"
                                                                    src={require("../photos/hinhanh/3.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img className="imgborder img-responsive"
                                                                    src={require("../photos/hinhanh/4.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img className="imgborder img-responsive"
                                                                    src={require("../photos/hinhanh/5.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img
                                className="imgborder img-responsive"
                                src={require("../photos/hinhanh/6.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img
                                className="imgborder img-responsive"
                                src={require("../photos/hinhanh/7.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img
                                className="imgborder img-responsive"
                                src={require("../photos/hinhanh/8.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img
                                className="imgborder img-responsive"
                                src={require("../photos/hinhanh/9.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img
                                className="imgborder img-responsive"
                                src={require("../photos/hinhanh/10.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img
                                className="imgborder img-responsive"
                                src={require("../photos/hinhanh/11.png")}/></div>

                            <div className="col-xs-6 col-sm-4"><img
                                className="imgborder img-responsive"
                                src={require("../photos/hinhanh/12.png")}/></div>

                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="smallspace"></div>
                                <button type="button" className="center-block btn btnreg redbg white"
                                        onClick={this._openModal}><h5>ĐĂNG KÝ</h5></button>
                                <div className="smallspace"></div>
                            </div>
                        </div>
                        <div className="smallspace"></div>
                    </div>
                </div>
                <div className="colorbar-bottom clbar-red"></div>
                <div id="yeucau">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                <div className="smallspace"></div>
                                <h4 className="dblue bold">YÊU CẦU ĐẦU VÀO CÁC TRƯỜNG<br
                                    className="visible-xs visible-sm"/> ĐẠI HỌC CÔNG LẬP TỐT TẠI MỸ</h4>
                                <h5 className="dblue bold">_______&nbsp;&nbsp;<span
                                    className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;<span
                                    className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;<span
                                    className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;_______</h5>

                                <div className="smallspace"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className="col-xs-10 col-sm-6 col-xs-offset-1 col-sm-offset-0 col-md-5 col-md-offset-1">
                                <div className="media">
                                    <div className="media-left"><img src={require("../photos/star.png")}/></div>
                                    <div className="media-body">
                                        <h4 className="dblue bold">Đại Học</h4>
                                        <h6><b><span className="dred">#1</span>. HOÀN THÀNH LỚP 12</b></h6>
                                        <h6><b><span className="dred">#2</span>. IELTS 4.5 HOẶC TOEFL 50</b></h6>
                                        <h6><b><span className="dred">#3</span>. KHÔNG CẦN SAT</b></h6>
                                        <h6><b><span className="dred">#4</span>. ĐIỂM TRUNG BÌNH GPA >=6.5</b></h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-md-5" id="rightreq">
                                <div className="media">
                                    <div className="media-left"><img src={require("../photos/star.png")}/></div>
                                    <div className="media-body">
                                        <h4 className="dblue bold">Thạc Sỹ</h4>
                                        <h6><b><span className="dred">#1</span>. HOÀN THÀNH ĐẠI HỌC</b></h6>
                                        <h6><b><span className="dred">#2</span>. IELTS 5.0 HOẶC TOEFL 60</b></h6>
                                        <h6><b><span className="dred">#3</span>. ĐIỂM TRUNG BÌNH GPA >=6.8</b></h6>
                                        <h6><b><span className="dred">#4</span>. BÀI LUẬN CÁ NHÂN</b></h6>
                                        <h6><b><span className="dred">#5</span>. THƯ GIỚI THIỆU GIÁO VIÊN</b></h6>
                                        <h6><b><span className="dred">#6</span>. KINH NGHIỆM LÀM VIỆC</b></h6>
                                        <h6><b>(TÙY NGÀNH)</b></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="smallspace"></div>
                                <p className="gray">* Học sinh có SAT (Đối với bậc Đại học), GMAT/GRE (Đối với bậc Thạc
                                    sỹ), điểm IELTS/TOEFL cao hơn sẽ có nhiều lựa chọn hơn</p>

                                <div className="smallspace"></div>
                            </div>
                        </div>
                        <div className="row">
                            <button type="button" className="center-block btn btnreg dbluebg white" onClick={this._openModal}><h5>ĐĂNG KÝ</h5>
                            </button>
                            <div className="space"></div>
                        </div>
                    </div>
                </div>
                <div className="colorbar-top clbar-dblue"></div>
                <div id="nganhhoc">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                <div className="smallspace"></div>
                                <h4 className="bold">DANH SÁCH MỘT SỐ NGÀNH</h4>
                                <h4 className="bold">SINH VIÊN VIỆT NAM ƯA THÍCH TẠI MỸ</h4>
                                <h5>_______&nbsp;&nbsp;<span className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;
                                    <span className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;<span
                                        className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;_______</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-5 col-md-offset-1">
                                <ul>
                                    <li><h6>Tài chính</h6></li>
                                    <li><h6>Quản trị nguồn nhân lực</h6></li>
                                    <li><h6>Kinh doanh quốc tế</h6></li>
                                    <li><h6>Quản ký kinh tế</h6></li>
                                    <li><h6>Hệ thống thông tin quản lý MIS</h6></li>
                                    <li><h6>Marketing</h6></li>
                                    <li><h6>Bất động sản</h6></li>
                                    <br/>
                                    <li><h6>Giáo dục nghệ thuật</h6></li>
                                    <li><h6>Quản lý thể thao và giải trí</h6></li>
                                    <li><h6>Giáo dục thể chất</h6></li>
                                    <br/>
                                    <li><h6>Công nghệ thông tin</h6></li>
                                    <li><h6>Kỹ thuật xây dựng</h6></li>
                                    <li><h6>Kỹ thuật máy tính</h6></li>
                                    <li><h6>Kỹ thuật điện</h6></li>
                                    <li><h6>Kỹ thuật cơ khí</h6></li>
                                    <br/>
                                    <li><h6>Quản lý khách sạn các chuyên ngành</h6></li>
                                    <li><h6>Quản lý đồ uống</h6></li>
                                    <li><h6>Quản lý ẩm thực</h6></li>
                                    <li><h6>Quản lý khách sạn/Nhà nghỉ</h6></li>
                                    <li><h6>Quản lý nhà hàng/Dịch vụ ăn uống</h6></li>
                                    <li><h6>Quản lý sự kiện</h6></li>
                                    <li><h6>Quản lý du lịch và lữ hành</h6></li>
                                </ul>

                                <div className="smallspace visible-xs"></div>
                                <div className="smallspace visible-xs"></div>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-5 col-md-offset-1">
                                <ul>
                                    <li><h6>Quảng cáo</h6></li>
                                    <li><h6>Phương tiện truyền thông</h6></li>
                                    <li><h6>Nghiên cứu truyền thông kỹ thuật số</h6></li>
                                    <li><h6>Báo chí</h6></li>
                                    <li><h6>Quan hệ công chúng</h6></li>
                                    <li><h6>Các chương trình Dự bị chuyên nghiệp:</h6></li>
                                    <li><h6>Luật, Y và Y tế (Thú y, Nhãn khoa, Nha khoa)</h6></li>
                                    <br/>
                                    <li><h6>Nghệ thuật giao tiếp</h6></li>
                                    <li><h6>Âm nhạc</h6></li>
                                    <li><h6>Nghệ thuật</h6></li>
                                    <li><h6>Nhiếp ảnh</h6></li>
                                    <br/>
                                    <li><h6>Hóa học</h6></li>
                                    <li><h6>Kinh tế học</h6></li>
                                    <li><h6>Quan hệ quốc tế</h6></li>
                                    <li><h6>Toán học</h6></li>
                                    <li><h6>Vật lý</h6></li>
                                    <li><h6>Xã hội học/Nhân chủng học</h6></li>
                                    <li><h6>Nghiên cứu về phụ nữ và giới tính</h6></li>
                                    <br/>
                                    <li><h6>Nghiên cứu môi trường</h6></li>
                                    <br/>
                                    <li><h6>Điều dưỡng</h6></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="smallspace"></div>
                            <button type="button" className="center-block btn btnreg whitebg dred" onClick={this._openModal}><h5>ĐĂNG KÝ</h5>
                            </button>
                            <div className="space"></div>
                        </div>
                    </div>
                </div>

                <div className="colorbar-bottom clbar-dblue"></div>
                <div className="container truong gray">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <div className="smallspace"></div>
                            <h4 className="gray bold">MỘT SỐ TRƯỜNG ĐẠI HỌC CÔNG LẬP</h4>
                            <h4 className="gray bold">SUNRISE VIETNAM LÀM ĐẠI DIỆN</h4>
                            <h5>_______&nbsp;&nbsp;<span className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;<span
                                className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;<span
                                className="glyphicon glyphicon-star"></span>&nbsp;&nbsp;_______</h5>
                        </div>
                        <div className="col-xs-12">
                            <img width="100%" src={require("../photos/partners.png")}/>

                            <div className="smallspace"></div>
                        </div>
                        <div className="col-xs-12">
                            <div className="smallspace"></div>
                            <button type="button" className="center-block btn btnreg redbg white" onClick={this._openModal}><h5>ĐĂNG KÝ</h5>
                            </button>
                            <div className="space"></div>
                        </div>
                    </div>
                </div>
                <div className="colorbar-top clbar-red"></div>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="smallspace"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="logoft hidden-xs col-sm-4 col-sm-offset-6" style={{"float" : "right"}}><img
                                className="img-responsive" src={require("../photos/logo.png")}/></div>
                        </div>
                        <div className="row">
                            <div className="smallspace"></div>
                            <div className="col-xs-12 col-sm-4">
                                <h6>VĂN PHÒNG HÀ NỘI</h6>

                                <p>86 CỬA BẮC - BA ĐÌNH - HÀ NỘI</p>

                                <p>TEL: (84-4) 3722.4878 - 3722.4898</p>

                                <p>FAX: (84-4) 3722.4855</p>

                                <div className="smallspace visible-xs"></div>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <h6>VĂN PHÒNG HẢI PHÒNG</h6>

                                <p>29 NGUYỄN TRÃI - NGÔ QUYỀN</p>

                                <p>TEL: (84-31) 2640689 - 3653269</p>

                                <p>FAX: (84-31) 3732895</p>

                                <div className="smallspace visible-xs"></div>
                                <div className="logoft visible-xs col-xs-7 col-xs-offset-1" style={{"float" : "right"}}>
                                    <img className="img-responsive" src={require("../photos/logo.png")}/></div>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <h6>VĂN PHÒNG HỒ CHÍ MINH</h6>

                                <p>LẦU 7, TÒA NHÀ THANH DUNG, SỐ 179 NGUYỄN CƯ TRINH, Q.1</p>

                                <p>TEL: (84-8) 38370176 - 38370226</p>

                                <p>FAX: (84-8) 38360940</p>

                                <div className="smallspace visible-xs"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-4">
                                <p>WEB: SUNRISEVIETNAM.COM</p>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <p>EMAIL: INFO@SUNRISEVIETNAM.COM</p>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <p>FACEBOOK: FB.COM/THAIDUONG.VIETNAM</p>
                            </div>
                            <div className="col-xs-12">
                                <div className="space hidden-xs"></div>
                            </div>

                        </div>
                    </div>
                </footer>
                <Modal show={this.state.isOpenModal} onHide={closeModal} aria-labelledby="ModalHeader"
                       backdrop='static'>
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>ĐĂNG KÝ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form data-toggle="validator" role="form" id="dangkyform" className="form-horizontal">
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <input aria-describedby="hvt" type="text" className="form-control dblue"
                                               id="hovaten" placeholder="Họ và tên" onChange={this._handle_Hovaten}
                                               value={this.state.hovaten}/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12 col-sm-6 marginbottom">
                                    <div className="input-group">
                                        <input type="text"
                                               maxLength="14" className="form-control dblue" id="sodt"
                                               placeholder="Số điện thoại" onChange={this._handle_Sodienthoai}
                                               value={this.state.sodienthoai}/>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="input-group">
                                        <input aria-describedby="email" type="text"
                                               className="form-control dblue" id="dcemail"
                                               placeholder="Địa chỉ Email" onChange={this._handle_Email}
                                               value={this.state.email}/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12 col-sm-6 marginbottom">
                                    <div className="input-group">
                                        <select id="danhtinh" className="form-control dblue"
                                                onChange={this._handle_Nguoidangkyla} value={this.state.nguoidangkyla}>
                                            <option defaultValue value="">Bạn là</option>
                                            <option value="Học sinh THPT">Học sinh THPT</option>
                                            <option value="Học sinh THCS">Sinh viên Đại học</option>
                                            <option value="Học sinh THCS">Đã tốt nghiệp</option>
                                            <option value="Phụ huynh">Phụ huynh</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="input-group">
                                        <select id="diachi" className="form-control dblue"
                                                onChange={this._handle_Thanhphodangsong}
                                                value={this.state.thanhphodangsong}>
                                            <option defaultValue value="">Nơi bạn đang sống</option>
                                            <option value="Hà Nội">Hà Nội</option>
                                            <option value="TP HCM">TP HCM</option>
                                            <option value="Hải Phòng">Hải Phòng</option>
                                            <option value="Đà Nẵng">Đà Nẵng</option>
                                            <option value="Cần Thơ">Cần Thơ</option>
                                            <option value="An Giang">An Giang</option>
                                            <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                                            <option value="Bắc Giang">Bắc Giang</option>
                                            <option value="Bắc Kạn">Bắc Kạn</option>
                                            <option value="Bạc Liêu">Bạc Liêu</option>
                                            <option value="Bắc Ninh">Bắc Ninh</option>
                                            <option value="Bến Tre">Bến Tre</option>
                                            <option value="Bình Định">Bình Định</option>
                                            <option value="Bình Dương">Bình Dương</option>
                                            <option value="Bình Phước">Bình Phước</option>
                                            <option value="Bình Thuận">Bình Thuận</option>
                                            <option value="Cà Mau">Cà Mau</option>
                                            <option value="Cao Bằng">Cao Bằng</option>
                                            <option value="Đắk Lắk">Đắk Lắk</option>
                                            <option value="Đắk Nông">Đắk Nông</option>
                                            <option value="Điện Biên">Điện Biên</option>
                                            <option value="Đồng Nai">Đồng Nai</option>
                                            <option value="Đồng Tháp">Đồng Tháp</option>
                                            <option value="Gia Lai">Gia Lai</option>
                                            <option value="Hà Giang">Hà Giang</option>
                                            <option value="Hà Nam">Hà Nam</option>
                                            <option value="Hà Tĩnh">Hà Tĩnh</option>
                                            <option value="Hải Dương">Hải Dương</option>
                                            <option value="Hậu Giang">Hậu Giang</option>
                                            <option value="Hòa Bình">Hòa Bình</option>
                                            <option value="Hưng Yên">Hưng Yên</option>
                                            <option value="Khánh Hòa">Khánh Hòa</option>
                                            <option value="Kiên Giang">Kiên Giang</option>
                                            <option value="Kon Tum">Kon Tum</option>
                                            <option value="Lai Châu">Lai Châu</option>
                                            <option value="Lâm Đồng">Lâm Đồng</option>
                                            <option value="Lạng Sơn">Lạng Sơn</option>
                                            <option value="Lào Cai">Lào Cai</option>
                                            <option value="Long An">Long An</option>
                                            <option value="Nam Định">Nam Định</option>
                                            <option value="Nghệ An">Nghệ An</option>
                                            <option value="Ninh Bình">Ninh Bình</option>
                                            <option value="Ninh Thuận">Ninh Thuận</option>
                                            <option value="Phú Thọ">Phú Thọ</option>
                                            <option value="Phú Yên">Phú Yên</option>
                                            <option value="Quảng Bình">Quảng Bình</option>
                                            <option value="Quảng Nam">Quảng Nam</option>
                                            <option value="Quảng Ngãi">Quảng Ngãi</option>
                                            <option value="Quảng Ninh">Quảng Ninh</option>
                                            <option value="Quảng Trị">Quảng Trị</option>
                                            <option value="Sóc Trăng">Sóc Trăng</option>
                                            <option value="Sơn La">Sơn La</option>
                                            <option value="Tây Ninh">Tây Ninh</option>
                                            <option value="Thái Bình">Thái Bình</option>
                                            <option value="Thái Nguyên">Thái Nguyên</option>
                                            <option value="Thanh Hóa">Thanh Hóa</option>
                                            <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                                            <option value="Tiền Giang">Tiền Giang</option>
                                            <option value="Trà Vinh">Trà Vinh</option>
                                            <option value="Tuyên Quang">Tuyên Quang</option>
                                            <option value="Vĩnh Long">Vĩnh Long</option>
                                            <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                            <option value="Yên Bái">Yên Bái</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12 col-sm-6 marginbottom">
                                    <div className="input-group">
                                        <select id="chuongtrinh" className="form-control selectpicker dblue"
                                                title="Bạn quan tâm đến chương trình" multiple
                                                data-selected-text-format="count>1" mobile="true"
                                                onChange={this._handle_Chuongtrinh}>
                                            <option value="Đại học năm nhất">Đại học năm nhất</option>
                                            <option value="Đại học vào thẳng">Đại học vào thẳng</option>
                                            <option value="Dự bị thạc sĩ">Dự bị thạc sĩ</option>
                                            <option value="Thạc sĩ">Thạc sĩ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="input-group">
                                        <select id="tgduhoc" className="form-control dblue"
                                                onChange={this._handle_Thoigianduhoc} value={this.state.thoigianduhoc}>
                                            <option defaultValue value="">Thời gian dự định du học</option>
                                            <option value="Kỳ xuân 2016">Kỳ hè 2016</option>
                                            <option value="Kỳ thu 2016">Kỳ thu 2016</option>
                                            <option value="Kỳ xuân 2017">Kỳ xuân 2017</option>
                                            <option value="Kỳ xuân 2017">Kỳ hè 2017</option>
                                            <option value="Kỳ thu 2017">Kỳ thu 2017</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12 col-sm-6 marginbottom">
                                    <div className="input-group">
                                        <select id="nhucau" className="form-control dblue"
                                                onChange={this._handle_Nhucauhoc} value={this.state.nhucauhoc}>
                                            <option defaultValue value="">Bạn có nhu cầu học
                                            </option>
                                            <option value="IELTS">IELTS</option>
                                            <option value="TOEFL">TOEFL</option>
                                            <option value="SAT">SAT</option>
                                            <option value="GMAT">GMAT</option>
                                            <option value="Không">Không</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="input-group">
                                        <select multiple="multiple" className="form-control selectpicker dblue"
                                                name="kenh[]" id="kenh" title="Bạn biết chương trình này qua kênh"
                                                data-selected-text-format="count>1" mobile="true"
                                                onChange={this._handle_Bietchuongtrinhquakenh}>
                                            <option value="Facebook SunriseVietnam">Facebook SunriseVietnam</option>
                                            <option value="Website SunriseVietnam">Website SunriseVietnam</option>
                                            <option value="Truyền hình Hải Phòng">Truyền hình Hải Phòng</option>
                                            <option value="Email">Email</option>
                                            <option value="Google">Google</option>
                                            <option value="Băng rôn">Băng rôn</option>
                                            <option value="Bạn bè giới thiệu">Bạn bè giới thiệu</option>
                                            <option value="Dân trí">Dân trí</option>
                                            <option value="Zing News">Zing News</option>
                                            <option value="VnExpress">VnExpress</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn dbluebg white" id="dkbtn" {..._disabled}
                                onClick={this._saveAndCloseModal}>Gửi đăng ký
                        </button>
                        <button type="reset" className="btn whitebg dred" onClick={this._resetForm}>Làm Lại</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}