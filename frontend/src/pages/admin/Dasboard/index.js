

const DashboardPage  = () => {
    return (
        <>
  <div className="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 className="h3 mb-0 text-gray-800">Trang chủ</h1>
    <a
      href="#"
      className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
    >
      <i className="fas fa-download fa-sm text-white-50" /> Generate Report
    </a>
  </div>
  {/* Content Row */}
  <div className="row">
    {/* Earnings (Monthly) Card Example */}
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Đơn hàng
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">01</div>
            </div>
            <div className="col-auto">
              <i className="fas fa-calendar fa-2x text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Earnings (Monthly) Card Example */}
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-success shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                Doanh thu
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                215,000 đ
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-dollar-sign fa-2x text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Earnings (Monthly) Card Example */}
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-info shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                Người dùng
              </div>
              <div className="row no-gutters align-items-center">
                <div className="col-auto">
                  <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                    5
                  </div>
                </div>
                <div className="col">
                  <div className="progress progress-sm mr-2">
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "50%" }}
                      aria-valuenow={50}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-clipboard-list fa-2x text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Pending Requests Card Example */}
    {/* <div class="col-xl-3 col-md-6 mb-4">
                      <div class="card border-left-warning shadow h-100 py-2">
                          <div class="card-body">
                              <div class="row no-gutters align-items-center">
                                  <div class="col mr-2">
                                      <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                          Pending Requests</div>
                                      <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                  </div>
                                  <div class="col-auto">
                                      <i class="fas fa-comments fa-2x text-gray-300"></i>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div> */}
  </div>
  {/* Content Row */}
  <div className="row">
    {/* Area Chart */}
    <div className="col-xl-8 col-lg-7">
      <div className="card shadow mb-4">
        {/* Card Header - Dropdown */}
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            Doanh thu theo tháng
          </h6>
          <div className="dropdown no-arrow">
            <a
              className="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
              aria-labelledby="dropdownMenuLink"
            >
              <div className="dropdown-header">Dropdown Header:</div>
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>
        </div>
        {/* Card Body */}
        <div className="card-body">
          <div className="chart-area">
            <canvas id="myAreaChart" />
          </div>
        </div>
      </div>
    </div>
    {/* Pie Chart */}
    <div className="col-xl-4 col-lg-5">
      <div className="card shadow mb-4">
        {/* Card Header - Dropdown */}
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            Sản phẩm theo danh mục
          </h6>
          <div className="dropdown no-arrow">
            <a
              className="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
              aria-labelledby="dropdownMenuLink"
            >
              <div className="dropdown-header">Dropdown Header:</div>
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>
        </div>
        {/* Card Body */}
        <div className="card-body">
          <div className="chart-pie pt-4 pb-2">
            <canvas id="myPieChart" />
          </div>
          <div className="mt-4 text-center small">
            <span className="mr-2">
              <i className="fas fa-circle text-primary" /> Direct
            </span>
            <span className="mr-2">
              <i className="fas fa-circle text-success" /> Social
            </span>
            <span className="mr-2">
              <i className="fas fa-circle text-info" /> Referral
            </span>
            <span className="mr-2">
              <i className="fas fa-circle text-danger" /> Referral
            </span>
            <span className="mr-2">
              <i className="fas fa-circle text-warning" /> Referral
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Content Row */}
  <div className="row">
    {/* Content Column */}
    <div className="col-lg-6 mb-4">
      <div className="row">
        {/* Project Card Example */}
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Sản phẩm sắp hết
              </h6>
            </div>
            <div className="card-body">
              <h4 className="small font-weight-bold">
                Sofa Hung Kinh <span className="float-right">Còn 2</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: "20%" }}
                  aria-valuenow={20}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Giường Okasa <span className="float-right">Còn 4</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: "40%" }}
                  aria-valuenow={40}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Ghế ăn Dubai <span className="float-right">Còn 6</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "60%" }}
                  aria-valuenow={60}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Bàn xoay Tokyo <span className="float-right">Còn 8</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: "80%" }}
                  aria-valuenow={80}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Sản phẩm sắp hết
              </h6>
            </div>
            <div className="card-body">
              <h4 className="small font-weight-bold">
                Sofa Hung Kinh <span className="float-right">Còn 2</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: "20%" }}
                  aria-valuenow={20}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Giường Okasa <span className="float-right">Còn 4</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: "40%" }}
                  aria-valuenow={40}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Ghế ăn Dubai <span className="float-right">Còn 6</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "60%" }}
                  aria-valuenow={60}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <h4 className="small font-weight-bold">
                Bàn xoay Tokyo <span className="float-right">Còn 8</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: "80%" }}
                  aria-valuenow={80}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Color System */}
      </div>
    </div>
  </div>
</>

    )
}

export default DashboardPage;