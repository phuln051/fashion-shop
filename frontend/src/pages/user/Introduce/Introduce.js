import './Introduce.scss'
const Introduce = () => {
    return(
<div className="container-introduce">
  <div className="container-intro">
    <div className="inspiration-container">
      <h1 className="inspiration-title">LỊCH SỬ HÌNH THÀNH</h1>
      <div className="images-section">
        <div className="image-text-block">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2021/11/bo-suu-tap-may-net-viet-duong-dai-3.jpg"
            alt="Thời làn gió xuân vào không gian với bình hoa trang trí"
          />
          <p>Thời làn gió xuân vào không gian với bình hoa trang trí</p>
        </div>
        <div className="image-text">
          <p>
            2021: Khẳng định thương hiệu bền vững với những bước phát triển mới
            dù đối mặt những khó khăn do dịch bệnh Covid. Hệ thống cửa hàng mở
            rộng, với showroom mới tại Bình Dương.
          </p>
          <p>
            2020: Đơn vị chủ quản thương hiệu Viet-Interior - AKA Furniture
            Group tái cơ cấu trở thành thành viên của tập đoàn AA Corporation -
            Tập đoàn sản xuất và thi công nội thất chất lượng cao hàng đầu Châu
            Á.
          </p>
          <p>
            2019: Đây là năm mang dấu ấn đặc biệt của thương hiệu Viet-Interior
            - Đánh dấu chặng đường phát triển 20 năm. Với sự xuất hiện của 2 cửa
            hàng tại Nguyễn Văn Hưởng (Q2, HCM) và Trung tâm nội thất Thụy Khuê
            (Tây Hồ, Hà Nội)
          </p>
          <p>
            2016: Mở rộng hệ thống Viet-Interior với 2 cửa hàng lớn ở ngay trung
            tâm thủ đô Hà Nội thuộc quận Hoàn Kiếm và quận Đống Đa.
          </p>
          <p>
            2011 - 2014: Khẳng định thương hiệu với sự xuất hiện của 2 cửa hàng
            mới tại ngã tư trung tâm Q1, TP.HCM (Hai Bà Trưng - Trần Cao Vân) và
            TTTM Royal City Hà Nội.
          </p>
          <p>
            2005 - 2010: Phát triển mạnh mẽ với hệ thống cửa hàng trên các khu
            đô thị mới là Viet-Interior Yên Hòa, Viet-Interior Phú Mỹ Hưng và
            Viet-Interior Centre - khu vực trung tâm Q1.
          </p>
          <p>
            2002 - 2005: Viet-Interior Cát Linh tại Hà Nội và Viet-Interior
            Citimart tại TP.HCM nhằm hoàn thiện hệ thống và phục vụ tốt hơn cho
            Khách hàng.
          </p>
          <p>
            {" "}
            1999: Ra đời với 2 cửa hàng lớn tại Hà Nội và TP.HCM, mang đậm phong
            cách riêng về thiết kế và cách bày trí.
          </p>
        </div>
      </div>
    </div>
    {/* thanh chuyen slide*/}
    <div className="indicators">
      <span className="indicator active" />
      <span className="indicator" />
      <span className="indicator" />
      {/* Thêm các span cho mỗi indicator mà bạn muốn */}
    </div>
    <div className="inspiration-container">
      <h1 className="inspiration-title">Giá trị và sự khác biệt</h1>
      <div className="images-section">
        <div className="image-text-block">
          <img src="https://nhaxinh.com/wp-content/uploads/2021/11/bo-suu-tap-maxine-phong-an-600x899.jpg" />
        </div>
        <div className="image-text">
          <a>
            Với mong muốn phát triển thương hiệu Việt bằng nội lực,
            Viet-Interior đã chú trọng vào thiết kế và sản xuất nội thất trong
            nước. Danh mục sản phẩm của Viet-Interior thường xuyên được đổi mới
            và cập nhật, liên tục cung cấp cho khách hàng các dòng sản phẩm theo
            xu hướng mới nhất. Do chính người Việt thiết kế và sản xuất, nội
            thất thương hiệu Viet-Interior luôn phù hợp với cuộc sống Á Đông,
            đem đến sự tiện nghi hoàn hảo trong mọi không gian sống
          </a>
        </div>
      </div>
    </div>
    {/* thanh chuyen slide*/}
    <div className="indicators">
      <span className="indicator active" />
      <span className="indicator" />
      <span className="indicator" />
      {/* Thêm các span cho mỗi indicator mà bạn muốn */}
    </div>
    <div className="text-wrapper">
      <h2>CHẤT LƯỢNG QUỐC TẾ</h2>
      <p>
        Sản xuất trực tiếp tại nhà máy Savimex với công nghệ hiện đại cùng đội
        ngũ thợ tay nghề cao. <br />
      </p>
      <p>
        - Nhà máy chế biến gỗ đầu tiên tại Việt Nam đạt chứng nhận hệ thống quản
        lý môi trường đạt chuẩn quốc tế ISO 14001.
        <br />
      </p>
      <p>
        - Rộng 10ha với hơn 1,500 công nhân viên giàu kinh nghiệm cùng máy móc
        công nghệ hiện đại. .<br />
      </p>
      <p />
    </div>
  </div>
  <div className="image">
    <img
      src="https://file.hstatic.net/200000065946/file/noi-that-moho-chat-luong-quoc-te_b4ea42c8ff834f2a9be8c7176a95b6f0.jpg"
      alt=""
    />
  </div>
</div>

    )
}
export default Introduce;