create database speedcarrental;
use speedcarrental;

create table Customer(
	CustomerID varchar(6),
    FirstName tinytext,
    LastName tinytext,
    Age tinytext,
    Email tinytext,
    Phone tinytext,
    Primary key (CustomerID)
);

create table VehicleInfor(
	VehicleID varchar(6),
    VehicleName tinytext,
    VehiclePrice decimal(65,2),
    VehicleType tinytext,
    Primary key (VehicleID)
);

Create table Reservation(
	Confirmation varchar(6),
    StartDate date,
    EndDate date,
    PickupLocation tinytext,
    Destination tinytext,
    CustomerID varchar(6),
    VehicleID varchar(6),
    primary key (Confirmation),
    foreign key (CustomerID) references Customer(CustomerID),
    foreign key (VehicleID) references VehicleInfor(VehicleID)
);

create table Invoice(
	InvoiceID varchar(6),
    Total decimal(65,2),
    VehiclePrice decimal(65,2),
    VehicleID varchar(6),
    CustomerID varchar(6),
    Confirmation varchar(6),
    primary key (InvoiceID),
    foreign key (CustomerID) references Customer(CustomerID),
    foreign key (VehicleID) references VehicleInfor(VehicleID),
    foreign key (Confirmation) references Reservation(Confirmation)

);

insert into VehicleInfor
values('VHC001','Mustang GT',149.00, 'Sport Car');
insert into VehicleInfor
values('VHC002','Mercedes GLA Convertible',249.00, 'Sport Car');
insert into VehicleInfor
values('VHC003','Huyndai Elentra',39.00, 'Sedan');
insert into VehicleInfor
values('VHC004','Ford Focus',59.00, 'Sedan');
insert into VehicleInfor
values('VHC005','Huyndai Sante',100.00, 'Sedan');
insert into VehicleInfor
values('VHC006','Mercedes GLC',199.00, 'SUV');

Select *
from VehicleInfor
order by VehicleID desc;

Update VehicleInfor
set VehicleType = 'SUV'
where VehicleID = 'VHC005';

Select VehicleID
from VehicleInfor
where VehicleName = 'mustang gt';

Select VehicleInfor.VehicleName
from VehicleInfor
Inner join Reservation On Reservation.VehicleID = VehicleInfor.VehicleID
where Confirmation = 'WJPMTI';
 
Select *
from Customer;

Select *
from Invoice
order by CreatedTime desc;

Select *
from Reservation;

Select CustomerID
from Reservation
where Confirmation = 'HSDMWB';

Select PickupLocation, Destination, date_format(StartDate, '%m-%d-%Y') as StartDate, date_format(EndDate, '%m-%d-%Y') as EndDate
from Reservation
where Confirmation = 'HSDMWB';

Select *
from Invoice;
 
delete 
from Invoice;

delete
from Reservation;

delete 
from Customer;


alter table VehicleInfor
add Identity int auto_increment;

alter table Invoice
drop column VehiclePrice;

alter table Customer
add column CreatedTime datetime;

alter table Customer
modify column CreatedTime datetime not null;

alter table Reservation
add column CreatedTime datetime not null;

alter table Invoice
add column CreatedTime datetime not null;