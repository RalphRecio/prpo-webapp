<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vendorList = [
            [
              "business_type" => "Re-manufactured Toners & Inks ",
              "supplier_name" => "-",
              "address" => "-",
              "contact_number" => "T=> (02) 889 2102 / M=> 0927.266.4786",
              "email" => "E=> emz_desacula@yahoo.com",
              "contact_person" => "Emiline Desacula",
              "payment_terms" => "-"
            ],
            [
              "business_type" => "Shuttle Transport Service",
              "supplier_name" => "BOYISH TRANSPORT SERVICES",
              "address" => "-",
              "contact_number" => "-",
              "email" => "-",
              "contact_person" => "-",
              "payment_terms" => "-"
            ],
            [
              "business_type"=> "Airconditioning Services",
              "supplier_name"=> "3RS Airconditioning Solutions",
              "address"=> "Oliveros St. , Can-asujan City of Carcar, Cebu",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "Adrian N. Genobia",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Contractor (Facilities)",
              "supplier_name"=> "A & M Glass and Aluminum Supply",
              "address"=> "Kalubihan 1 Ticgahon,Bankal Lapu-lapu City\r\nBasak, Lapu-Lapu City, Cebu",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "Aries Galimba",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Transport Service (Rental)",
              "supplier_name"=> "A&T Transport",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "M",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "AAIFREIGHT MANAGEMENT Center",
              "supplier_name"=> "AAI Project Logistics Inc.  (formerly AAI+PEERS, INC)",
              "address"=> "Kaingin Road, Multinational Village, Paranaque City / Lot 562 B-2 Governor's Drive, Brgy. Maduya, Carmona Cavite",
              "contact_number"=> "-",
              "email"=> "E=> nina_silot@aai.com.ph",
              "contact_person"=> "Nina R. Silot",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Appliance Center",
              "supplier_name"=> "Abenson Cebu City",
              "address"=> "Cebu City",
              "contact_number"=> "-",
              "email"=> "E=> accountexecutive.cebu@abenson.com",
              "contact_person"=> "Mai Angel Jubay",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Appliance Center",
              "supplier_name"=> "Abenson Ventures Inc.",
              "address"=> "Waltermart Bldg 8001-A Noth Edsa\r\nVeterans Village Quezon City",
              "contact_number"=> "T=> (02) 8811 8811",
              "email"=> "E=> shop@abenson.com",
              "contact_person"=> "JHON CARLO LOPEZ_Ayala Malls Solenad",
              "payment_terms"=> "ASAP"
            ],
            [
              "business_type"=> "Contractor (Facilities)",
              "supplier_name"=> "Accelade Construction",
              "address"=> "Unit 7A Deiparine Building, N. Bacalso Ave. Bulacao Talisay City 6045 Cebu",
              "contact_number"=> "(032) 254-1389",
              "email"=> "E=> lee@acceladecon.com",
              "contact_person"=> "Arch. Lee Villanueva",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Accent Micro - ATC",
              "address"=> "+632.408.6509",
              "contact_number"=> "Leo Caparas",
              "email"=> "-",
              "contact_person"=> "+632.807.4385",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Accent Micro Products",
              "address"=> "632 323 4766 loc 2809",
              "contact_number"=> "Mike Taino",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Accent Microsystems - AMTI",
              "address"=> "8/F East Tower, Philippine Stock Exchange, Center, Exchange Road, Ortigas Center, Pasig City 1605 Philippines      ",
              "contact_number"=> "T (+632) 7718.7388 / (+632) 8988.9788",
              "email"=> "E=> inquiries@amti.com.ph / angelyn.domingo@amti.com.ph",
              "contact_person"=> "Ange Domingo",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Service Tools",
              "supplier_name"=> "Access Frontier Technologies Inc.",
              "address"=> "Unit 702 Greenbelt Mansion No. 106 Perea St. Legaspi Village, Makati City",
              "contact_number"=> "T=> 8923883 Loc. 105 / 116",
              "email"=> "E=> telesales7@accessfrontier.net / sales@afti.com.ph",
              "contact_person"=> "Leslie Villegas",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Membership and Acceditors (Yearly)",
              "supplier_name"=> "ACCI",
              "address"=> "+632 842.3530 loc 181-182, 154",
              "contact_number"=> "Daisy",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "DIY Store",
              "supplier_name"=> "Ace Hardware Festival Mall",
              "address"=> "-",
              "contact_number"=> "+632.850.3908-10",
              "email"=> "-",
              "contact_person"=> "Kiko",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "DIY Store",
              "supplier_name"=> "Ace Hardware Muntinlupa Mall",
              "address"=> "-",
              "contact_number"=> "+63 2.6591602 / 659.1904",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "DIY Store",
              "supplier_name"=> "Ace Hardware SM Clark",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "DIY Store",
              "supplier_name"=> "Ace Hardware SM South Mall",
              "address"=> "-",
              "contact_number"=> "+632.806.7444",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Printing Services",
              "supplier_name"=> "Adamvl Printing Services",
              "address"=> "F Reyes St. Purok 6 Brgy Balibago Santa Rosa City Laguna",
              "contact_number"=> "0966 274 8777",
              "email"=> "alvinesm@gmail.com",
              "contact_person"=> "Alvin and Perlita Sta. Maria",
              "payment_terms"=> "COD"
            ],
            [
              "business_type"=> "Video Editing Software",
              "supplier_name"=> "Adobe",
              "address"=> "345 Park Avenue\r\nSan Jose, CA 95110-2704",
              "contact_number"=> "408-536-6000",
              "email"=> "N.A",
              "contact_person"=> "N.A.",
              "payment_terms"=> "Online Payment"
            ],
            [
              "business_type"=> "AIRCON MAINTENANCE & SERVICES",
              "supplier_name"=> "Aircon Express",
              "address"=> "Unit F.E.S Carlos Arcade, Pulong Sta Cruz, Santa Rosa, 4026 Laguna",
              "contact_number"=> "0917 524 5756",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "AIRCON MAINTENANCE & SERVICES",
              "supplier_name"=> "Airgonomic Airconditioning Services",
              "address"=> "837Q+H3V, Louis Street Mondo Bambini, Jubilation, Biñan, 4024 Laguna",
              "contact_number"=> "0956 845 4089",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "AIRCON MAINTENANCE & SERVICES",
              "supplier_name"=> "AJA Refrigeration And Air Conditioning Supply And Services",
              "address"=> "Block 26 Lot 56 Berkeley Heights Subdivision, Pulong Santa Cruz, Santa Rosa, 4026 Laguna",
              "contact_number"=> "(049) 508 2245",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "ALIBATA LTD",
              "address"=> "Phase 5B, Laguna Technopark, Lot 3 E Main Ave 4024 Biñan Laguna",
              "contact_number"=> "(049) 554 9360",
              "email"=> "N.A",
              "contact_person"=> "Maylene Laguardia",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Midori Shoes, Bunny Suit with Booties, Cleanroom Materials",
              "supplier_name"=> "Allkey International, Inc.",
              "address"=> "+63.2.843.0014 (Manila)",
              "contact_number"=> "Rovine Navarrete",
              "email"=> "A=> aiiountexecu+6ve.international@allkey.com",
              "contact_person"=> "+63.46.430.0475",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Audio Visual Equipments",
              "supplier_name"=> "Alpha Digizone Marketing",
              "address"=> "No. 2702 Brgy. 97 Taft Ave., Pasay City Fourth District, Metro Manila 1300",
              "contact_number"=> "T=> 02.8.822.3467",
              "email"=> "-",
              "contact_person"=> "Sherwin Chan So",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Restaurant & Catering Services",
              "supplier_name"=> "Ambers Binan",
              "address"=> "-",
              "contact_number"=> "T=> (049) 535-5555",
              "email"=> "-",
              "contact_person"=> "Mark Roland C. Domingo",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "AMTI",
              "address"=> "-",
              "contact_number"=> "T=> (2)  7718.7388 / (2) 8988.9788",
              "email"=> "E=> angelyn.domingo@amti.com.ph",
              "contact_person"=> "Angelyn Mae Domingo",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Signages and Printing Needs",
              "supplier_name"=> "Analog Soul",
              "address"=> "-",
              "contact_number"=> "T=> 894.2883",
              "email"=> "E=> apolonio@analog-soul.com",
              "contact_person"=> "Apple Dela Pena",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Pest and Disinfecting Works",
              "supplier_name"=> "ANTLER PEST CONTROL SERVICES",
              "address"=> "31 Jesus Street S.F.D.M., Quezon City",
              "contact_number"=> "T=> 371-2669 / 414-3409 ",
              "email"=> "E=> antler_pc@yahoo.com / antlerpestcontrol@gmail.com",
              "contact_person"=> "Jhenny Masangkay",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Office & Panty Supplies",
              "supplier_name"=> "Aqua Rite",
              "address"=> "-",
              "contact_number"=> "+63.2.381.1031",
              "email"=> "M",
              "contact_person"=> "Rommel \"Bates\" Meade",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "Ark One Solutions, Inc.",
              "address"=> "Unit 405-406 Park Trade Centre\r\n1716 Investment Drive Madrigal Business Park \r\nAlabang, Muntinlupa City Philippines 1770",
              "contact_number"=> "T=> 842-9090/9191",
              "email"=> "marife_crucero@ark-one.com.ph /\r\nA1 Supplychain <supplychain@ark-one.com.ph",
              "contact_person"=> "Marife Crucero",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Security Access",
              "supplier_name"=> "ARMLink Computer Center INC.",
              "address"=> "Unit 90A-D Amante Bldg. National Road, Putatan, Muntinlupa City Philippines",
              "contact_number"=> "T=> (02) 805-0092 / 556-9302 / 556-9302",
              "email"=> "E=> armlink@armlinkccs.com / sales@armlinkccs.com / support@armlinkccs.com",
              "contact_person"=> "Reque C. Carallas",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "AS1 Plus Inc.",
              "address"=> "Unit 402, 8 Antonio Centre Prime Street, Madrigal Business Park Ayala Alabang, Muntinlupa City Philippines, 1780",
              "contact_number"=> "(632)-8559-1970 Local 302",
              "email"=> "E=> ramild@as1plus.ph",
              "contact_person"=> "Ramil T. Delos Reyes",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Transport Service (Rental)",
              "supplier_name"=> "Avelardo Villanueva",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Medical Clearance",
              "supplier_name"=> "Aventus Medical Care Inc.",
              "address"=> "Room 301, 3rd Floor Comfoods Building, Sen. Gil Puyat Avenue, cor Chino Roces Ave, Makati, 1203 Metro Manila",
              "contact_number"=> "+63 2 8840 0588 / (02) 8817-1597 (02) 8817-8723",
              "email"=> "E=> inquiry@aventusmedical.com",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Leassor",
              "supplier_name"=> "Baguio Lease",
              "address"=> "-",
              "contact_number"=> "Justilito G. Racho Thru Vic Valerio or Wendy Miclat",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Law Office",
              "supplier_name"=> "Baniqued & Bello",
              "address"=> "8/F Jollibee Centre, San Miguel Ave. Pasig City 1605, Philippines",
              "contact_number"=> "T=>+ 63 2 8633 9418 to 19",
              "email"=> "E=> mcdomingo@baniquedlaw.com",
              "contact_person"=> "Atty. Terence H. Bello c/o Mark C. Domingo",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Law Office",
              "supplier_name"=> "Baniqued & Bello",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "Patricia D. Ibañez\r\nAssociate\r\nBaniqued & Bello\r\n8/F Jollibee Centre, San Miguel Ave.\r\nPasig City 1605, Philippines\r\nTelephone=> +63 2 8633 9418\r\nFax=> +63 2 8633 1911\r\nMobile=> +63 919 091 7687\r\nE-mail=> pdibanez@baniquedlaw.com \r\nInternet=> http=>//www.baniquedlaw.com",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Law Office",
              "supplier_name"=> "Baniqued & Bello",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "Atty. Mark Roland C. Domingo\r\nSenior Associate\r\nBaniqued & Bello\r\n8/F Jollibee Centre, San Miguel Ave.\r\nPasig City 1605, Philippines\r\nTelephone=> + 63 2 8633 9418 to 19\r\nFax=> +63 2 8633 1911\r\nMobile=> +63 933 866 8896\r\nE-mail=> mcdomingo@baniquedlaw.com\r\nInternet=> http=>//www.baniquedlaw.com",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Management Solutions",
              "supplier_name"=> "Barcode Scanning Solutions of the Phils. Inc.",
              "address"=> "#64 L. Esteban St. Brgy. Highway Hills, Mandaluyong City",
              "contact_number"=> "T=> (02) 85314844 / 85348806 / 86544934 / 88781383",
              "email"=> "infor@barcodephils.com / sales@barcodephils.com",
              "contact_person"=> "Joel J. Wenceslao",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Account Bank Branch",
              "supplier_name"=> "BDO - Sta. Rosa Arcadia Branch",
              "address"=> "Unit Anchor 2, Arcadia Bldg., Greenfield City, Tagaytay- Balibago Road, Brgy. Don Jose, Sta. Rosa City, Laguna",
              "contact_number"=> "(02) 8519-4681\r\n(049) 502-0441\r\n(049) 502-0451\r\n(049) 502-0448\r\n(02) 840-7000 loc 35306",
              "email"=> "bh.sta-rosa-arcadia@bdo.com.ph / Loanservices@bdo.com.ph",
              "contact_person"=> "Cyrna Joy \"CJ\" Villarruz",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Account Bank Branch",
              "supplier_name"=> "BDO - Sta. Rosa Arcadia Branch",
              "address"=> "Unit Anchor 2, Arcadia Bldg., Greenfield City, Tagaytay- Balibago Road, Brgy. Don Jose, Sta. Rosa City, Laguna",
              "contact_number"=> "(02) 8519-4681\r\n(049) 502-0441\r\n(049) 502-0451\r\n(049) 502-0448\r\n(02) 840-7000 loc 35306",
              "email"=> "bh.sta-rosa-arcadia@bdo.com.ph / Loanservices@bdo.com.ph",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Account Bank Branch",
              "supplier_name"=> "BDO - Sta. Rosa Arcadia Branch",
              "address"=> "Unit Anchor 2, Arcadia Bldg., Greenfield City, Tagaytay- Balibago Road, Brgy. Don Jose, Sta. Rosa City, Laguna",
              "contact_number"=> "(02) 8519-4681\r\n(049) 502-0441\r\n(049) 502-0451\r\n(049) 502-0448\r\n(02) 840-7000 loc 35306",
              "email"=> "bh.sta-rosa-arcadia@bdo.com.ph / Loanservices@bdo.com.ph",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Account Bank Branch",
              "supplier_name"=> "BDO Marketing",
              "address"=> "-",
              "contact_number"=> "+632.807.4755",
              "email"=> "-",
              "contact_person"=> "Dhia Hernandez",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Property Management Department",
              "supplier_name"=> "BDO Unibank, Inc. BDO Property Management Department",
              "address"=> "25/F, Pacific Star Building, Sen. Gil Puyat Ave.\r\ncorner Makati Ave., Makati City",
              "contact_number"=> "8702-7030 or Avaya 27030",
              "email"=> "-",
              "contact_person"=> "Maverick L. Gozano",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Property Management Department",
              "supplier_name"=> "BDO Unibank, Inc. BDO Property Management Department",
              "address"=> "25/F, Pacific Star Building, Sen. Gil Puyat Ave.\r\ncorner Makati Ave., Makati City",
              "contact_number"=> "Direct Line=> 8702-7039 Fax No. 886-6320",
              "email"=> "-",
              "contact_person"=> "Margerine B. Macale",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Account Bank Branch",
              "supplier_name"=> "BDO-Tierra Nueva",
              "address"=> "-",
              "contact_number"=> "+632.842.3255 / 807.0660",
              "email"=> "-",
              "contact_person"=> "Ma. Luisa Escoto - Branch Manager",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Office Furnitures",
              "supplier_name"=> "Best Partition & Office Systems, Inc.\r\n",
              "address"=> "Unit 106, 3307 Matanzas St., Palanan, Makati City",
              "contact_number"=> " T=> +632 624 0667 / +632 551 3664",
              "email"=> "bestpartition.888@gmail.com",
              "contact_person"=> "Crisda G. Liwag",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Leassor",
              "supplier_name"=> "BF Holdings (AC Cebu Offce)",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "BIYABIT BAG TRADING",
              "address"=> "Blk 33 Lot 26 Inocencio Salud, Gen. Mariano Alvarez Cavite Philippines 4117",
              "contact_number"=> "M=> 09499205310",
              "email"=> "biyabitbagtrading@gmail.com",
              "contact_person"=> "Donabelle B. Sanico",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Website Hosting Services",
              "supplier_name"=> "BlueHost (Website Hosting Services)",
              "address"=> "1500 North Priest Drive Suite 200, 2nd Flr. Tempe - 85281 ARIZONA, USA",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "1-Auto renewal"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Boxtalks Inc.",
              "address"=> "56 Mayor Ignacio Santos Diaz Street Brgy. San Martin de Porres, Cubao, Quezon City, Metro Manila, Philippines 1109",
              "contact_number"=> "+632 585.2991",
              "email"=> "E=> corporatesales@beyondthebox.com.ph",
              "contact_person"=> "Kristoffer Ryan Verde'",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Studio Equipments",
              "supplier_name"=> "Bright Spot Studio",
              "address"=> "Phase 2 Block 10 Lot 11 Cera Citation Brgy. Sto, Tomas Binan, Laguna 4024",
              "contact_number"=> "-",
              "email"=> "E=> shenicasaquing@gmail.com",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Car Dealer",
              "supplier_name"=> "Bryan M. Boo",
              "address"=> "Villa Beatriz Subd. Tambo Lipa City, Batangas",
              "contact_number"=> "T=> 0998 964 6337",
              "email"=> "E=> bboo@aurotech.com",
              "contact_person"=> "Bryan M. Boo",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Visual and Video Equipments",
              "supplier_name"=> "Canon Marketing (Philippines) Inc.",
              "address"=> "Venice Grand Canal Mall Commerce & Industry Plaza Campus Ave. cor. Park Avenue, McKinley Hill Dr, Taguig, 1634 M.M.",
              "contact_number"=> "T=> 8 884.9090 Loc. 9315",
              "email"=> "E=> fidel_santos@canon.com.ph",
              "contact_person"=> "Fidel Santos",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Contractor (Facilities)",
              "supplier_name"=> "Carpentry Works",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "Marvin Pagtalunan",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Training & Consultancy Services",
              "supplier_name"=> "Catalyst360 Training & Consultancy",
              "address"=> "Unit 404, Praxedes Place, East Capitol Drive, corner Santa Rosa St, Pasig, Metro Manila",
              "contact_number"=> "T=> (02) 7751 4194",
              "email"=> "E=> info@catalyst360.com.ph",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Sounds & Lights",
              "supplier_name"=> "Cholo Sounds & Lights",
              "address"=> "San Pedro, Laguna",
              "contact_number"=> "T=> ",
              "email"=> "E=> ",
              "contact_person"=> "Muriel D. Flores",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Car Seller",
              "supplier_name"=> "Chris Dominic V. Lacerna",
              "address"=> "No. 13 Carmelite Subdivisiion rtgy. XI, Lucena City, Quezon Province",
              "contact_number"=> "-",
              "email"=> "E=> chrisdominicl@yahoo.com",
              "contact_person"=> "Chris Dominic V. Lacerna",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Restaurant & Catering Services",
              "supplier_name"=> "Circulo Resto (Spanish Cuisine)",
              "address"=> "-",
              "contact_number"=> "+632 810.8735 / 810.2763",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Transport Service (Rental)",
              "supplier_name"=> "CJ and RJ Travel & Tours",
              "address"=> "B25 L34, Centennial Townhomes, San isidro, Cabuyao City, Laguna",
              "contact_number"=> "M=> 0923 491 8245",
              "email"=> "cjandrjtravel@gmail.com",
              "contact_person"=> "Mary Grace M. Arca",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Leassor",
              "supplier_name"=> "Clark Apartment",
              "address"=> "-",
              "contact_number"=> "Ms. Malou",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Leassor",
              "supplier_name"=> "Clark Apartment",
              "address"=> "-",
              "contact_number"=> "Ricky Gutierrez",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Restaurant & Catering Services",
              "supplier_name"=> "Claudia's Kitchen",
              "address"=> "-",
              "contact_number"=> "'+632.659.8341 / 844.1661",
              "email"=> "pinky_arellano@yahoo.com",
              "contact_person"=> "Pinky Arellano",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "ESD Shoes and more",
              "supplier_name"=> "CLEANFIT TECHNOLOGIES INTERNATIONAL INC.",
              "address"=> "141 East Main Avenue Loop Phase 6 Innorev\r\nBldg Laguna Technopark SEZ, Biñan, 4024 Laguna",
              "contact_number"=> "T=> ( 049) 508 - 4080",
              "email"=> "E=> mariel.aguila@cleanfittech.com / inquiry@cleanfittech.com",
              "contact_person"=> "Mariel Aguila",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Electronic Devices",
              "supplier_name"=> "Columbia Technoliges, Inc\r\n1136-1146 Nakpil Street, Malate II, Manila",
              "address"=> "+632 400 6053",
              "contact_number"=> "Joselito Maghari",
              "email"=> "-",
              "contact_person"=> "+632 524 0393",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Electronic Devices",
              "supplier_name"=> "Columbia Technologies, Inc.",
              "address"=> "1136-1146 J. Nakpil St., Malate II, Manila 1007",
              "contact_number"=> "(632) 524-0393 to 94",
              "email"=> "-",
              "contact_person"=> "Sheena Etemadpour / Joan Maribao / Stephanie Fortuna",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "Office Supplies",
              "supplier_name"=> "Contrade Integrated Depot, Inc.",
              "address"=> "9000 Cayetano Ave., Brgy. Ususan Taguig City",
              "contact_number"=> "02-2605665",
              "email"=> "cldi@contrade.com.ph; amc_contrade@yahoo.com",
              "contact_person"=> "Ms. Lea dela Cruz",
              "payment_terms"=> "15days"
            ],
            [
              "business_type"=> "Airconditioning Services",
              "supplier_name"=> "Cool Den Enterprises",
              "address"=> "#5, Plan Bldg., Macabling Nat'l Hiway, Sta. Rosa, Laguna",
              "contact_number"=> "M=> 0917 544 6796 / 0933 868 7828",
              "email"=> "E=> sacro_reynaldo@yahoo.com / coolden_ent@yahoo.com",
              "contact_person"=> "Engr. Reynaldo M. Sacro",
              "payment_terms"=> "50% DP / 50% COMPLETION"
            ],
            [
              "business_type"=> "PHOTOGRAPHY",
              "supplier_name"=> "CORPORATEMANILA PHOTO AND VIDEO SERVICES",
              "address"=> "Unit 6, Blk. 41 4th St New Era Sampaloc V 4114, City of Dasmarinas Cavite",
              "contact_number"=> "T=> +639399781",
              "email"=> "-",
              "contact_person"=> "Zai Torres",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Printed Forms (AC Calling Cards)",
              "supplier_name"=> "Creative Designs",
              "address"=> "108 Kalumpang St. Sta. Rosa Village 1, Laguna",
              "contact_number"=> "+63.049.543.9598.",
              "email"=> "abby.creativetwo@gmail.com",
              "contact_person"=> "Abby Olfato",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Car Dealer",
              "supplier_name"=> "CT CITIMOTORS INC -ALABANG",
              "address"=> "Blk 42 Lot A&B, Westgate Business District, Alabang–Zapote Rd, Muntinlupa, Metro Manila",
              "contact_number"=> "T=> (02)7502-9164",
              "email"=> "E=> melvinctmotors@gmail.com",
              "contact_person"=> "MELVIN LOPEZ",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "TROPHY",
              "supplier_name"=> "CT-BOND DECORATIVE MATERIALS TRADING",
              "address"=> "Alinsod Compound, Brgy. Tagapo, Sta. Rosa City, Laguna",
              "contact_number"=> "T=> (028) 935-0248\r\nM=> 0926 068 0554",
              "email"=> "alucophi@gmail.com",
              "contact_person"=> "Rodnel Maycacayan",
              "payment_terms"=> "COD"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "Czelso Reich Trading Corporation",
              "address"=> "#32 Tulay Bato San Antonio City of Binan, Laguna",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "Ruby Irlandez",
              "payment_terms"=> "30 Days"
            ],
            [
              "business_type"=> "Airconditioning Services",
              "supplier_name"=> "Dairo Aire Corporation (Panasonic)",
              "address"=> "No. 18 National Road Bayanan Muntinlupa City",
              "contact_number"=> "T=> 861-1550 / 8546-7727 ",
              "email"=> "E=> dairoairecorp@yahoo.com",
              "contact_person"=> "Aristotle S. Songcuya",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Airconditioning Services",
              "supplier_name"=> "Dairo Aire Corporation (Panasonic)",
              "address"=> "No. 18 National Road Bayanan Muntinlupa City",
              "contact_number"=> "T=> 861-1550 / 8546-7727 ",
              "email"=> "E=> dairoairecorp@yahoo.com",
              "contact_person"=> "Melanie Marapia",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Printed Forms (AC Billing Invoice)",
              "supplier_name"=> "DATA COMPUTER FORMS, INC.",
              "address"=> "86 Domingo M. Guevara Street (formerly Libertad Street), Mandaluyong City 1550, Metro Manila, PHILIPPINES",
              "contact_number"=> "+63.2.718.1888 / 531.0374 / 718.3667 / 718.1932",
              "email"=> "dcfigraphics@yahoo.com",
              "contact_person"=> "Ellen Ortega",
              "payment_terms"=> "COD w/ 50% dp"
            ],
            [
              "business_type"=> "Vehicle Dealer",
              "supplier_name"=> "Dearborn Motors Co. Inc. (Ford Alabang)",
              "address"=> "Alabang-Zapote Road\r\nFilinvest Corporate City\r\nMuntinlupa Alabang",
              "contact_number"=> "T=> (2) 884 23681 Loc. 5122 up to 5126",
              "email"=> "carina.e.tanedo@dearbornmotors.com",
              "contact_person"=> "Carina \"Caren\" Tanedo",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Car Dealer",
              "supplier_name"=> "DEARBORN MOTORS CO., INC (Ford Alabang)",
              "address"=> "Alabang-Zapote E Svc Rd, Filinvest Corporate Center, Alabang, Muntinlupa, Metro Manila",
              "contact_number"=> "-",
              "email"=> "E=> shop@dearborn.com",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Office & Panty Supplies",
              "supplier_name"=> "Deep Well",
              "address"=> "-",
              "contact_number"=> "+632 828.0043",
              "email"=> "M",
              "contact_person"=> "Rens",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Plumbing and Sanitation Services",
              "supplier_name"=> "DG Malabanan Septic Tank Siphoning & Tubero Services",
              "address"=> "-",
              "contact_number"=> "632 357 4945",
              "email"=> "-",
              "contact_person"=> "Marvin Torres",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "DIAMOND INTERIOR IND. CORP.",
              "address"=> "Humabon Ave. North Reclamation Area. Cebu City",
              "contact_number"=> "T=> 032 232-6016 / F=> 032 232 6018",
              "email"=> "dimcofurnitures@yahoo.com.ph",
              "contact_person"=> "Joanah May Letegio",
              "payment_terms"=> "50% DP"
            ],
            [
              "business_type"=> "Machine Parts, Tools & Equipment and Consumables",
              "supplier_name"=> "Disco Japan",
              "address"=> "13-11 Omori-Kita 2-chome\r\nOta-ku, Tokyo 143-8580 Japan",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "DKBA Automation and Industrial Trading",
              "address"=> "B1 L5 Rosario Heights Subdivision Market Area Santa Rosa City",
              "contact_number"=> "-",
              "email"=> "E=> djanalumaga@gmail.com",
              "contact_person"=> "Djan Karmelo alumaga",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Internet and Mobile Provider",
              "supplier_name"=> "Eastern Telecomunication Phils. Inc.",
              "address"=> "-",
              "contact_number"=> "DL=> +63.32.4122337",
              "email"=> "E=> DelariarteCT@etpi.com.ph",
              "contact_person"=> "Cathelyn Ann Delariarte – Dumdumaya",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "EASYCLICKS PRODUCTION",
              "address"=> "Blk 46 Lot 30 Makati Drive St. Phase 3 Sampaloc 4, Dasmarinas Cavite",
              "contact_number"=> "M=> 0945 586 0638",
              "email"=> "E=> easyclicksgroup@gmail.com",
              "contact_person"=> "Michael Angelo Fernandez",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Midori Shoes, Bunny Suit with Booties, Cleanroom Materials",
              "supplier_name"=> "Echoline Marketing",
              "address"=> "+63.49.411.1823 (Laguna)",
              "contact_number"=> "Eva Galino",
              "email"=> "A=> emountexecu+6ve.echoline@echoline.com",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "E-Hub Computers and Accessories",
              "address"=> "+63.2.775.0140 to 41",
              "contact_number"=> "Lhea Abcede",
              "email"=> "-",
              "contact_person"=> "+63.2.775.0140",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "General Contractor",
              "supplier_name"=> "EJE Industrial Builders & Developers",
              "address"=> "3rd Flr. EJE Bldg., Lot 2-C4, Sta. Rosa Tagaytay Road., Brgy. Puting Kahoy, Silang, Cavite 4118",
              "contact_number"=> "T=> 046-443-5221 / 049-576-4042",
              "email"=> "main@eje.com.ph",
              "contact_person"=> "Eric V. Napolitano",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Printing Solutions",
              "supplier_name"=> "Emelan Printshop Social & Commercial Printer",
              "address"=> "Blk 38 Lot 8 Villa Palao Rd, Subd, Calamba, 4027 Laguna",
              "contact_number"=> "T=> 049-502-4137 / 049-576-6978 / 049-591-0051",
              "email"=> "E=> emelan_printshoppe@yahoo.com.ph",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Pest and Disinfecting Works",
              "supplier_name"=> "Entom pest Control & General Services Corp.",
              "address"=> "+632 809 1666/809 2685",
              "contact_number"=> "Cynthia Melendres",
              "email"=> "-",
              "contact_person"=> "+632 850 8941",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Visual Prints ",
              "supplier_name"=> "Evolution Advertising",
              "address"=> "-",
              "contact_number"=> "T=> 7502-7344 ",
              "email"=> "E=> evolution_advertising@yahoo.com",
              "contact_person"=> "Mary Ann Tan-Barnachea ",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "OFFICE SUPPLIES",
              "supplier_name"=> "Exeltrade Corp",
              "address"=> "Unit 3 G/F CTP Alpha TowerInvestment Drive Madrigal Business ParkAyala Alabang, Muntinlupa, 1778 MM",
              "contact_number"=> "(02) 8682-8518 / 0917-708-4847 /0917-708-4848",
              "email"=> "sales@exeltradecorporation.com",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "INSURANCE",
              "supplier_name"=> "Exeltrade Corp",
              "address"=> "Unit 3 G/F CTP Alpha TowerInvestment Drive Madrigal Business ParkAyala Alabang, Muntinlupa, 1778 MM",
              "contact_number"=> "(02) 8682-8518 / 0917-708-4847 /0917-708-4848",
              "email"=> "sales@exeltradecorporation.com",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "TRUCKS",
              "supplier_name"=> "Exeltrade Corp",
              "address"=> "Unit 3 G/F CTP Alpha TowerInvestment Drive Madrigal Business ParkAyala Alabang, Muntinlupa, 1778 MM",
              "contact_number"=> "(02) 8682-8518 / 0917-708-4847 /0917-708-4848",
              "email"=> "sales@exeltradecorporation.com",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "STORAGE",
              "supplier_name"=> "Exeltrade Corp",
              "address"=> "Unit 3 G/F CTP Alpha TowerInvestment Drive Madrigal Business ParkAyala Alabang, Muntinlupa, 1778 MM",
              "contact_number"=> "(02) 8682-8518 / 0917-708-4847 /0917-708-4848",
              "email"=> "sales@exeltradecorporation.com",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "CONSTRUCTION MATERIALS & SERVICES",
              "supplier_name"=> "Exeltrade Corp",
              "address"=> "Unit 3 G/F CTP Alpha TowerInvestment Drive Madrigal Business ParkAyala Alabang, Muntinlupa, 1778 MM",
              "contact_number"=> "(02) 8682-8518 / 0917-708-4847 /0917-708-4848",
              "email"=> "sales@exeltradecorporation.com",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Visual Prints ",
              "supplier_name"=> "Facebook Account",
              "address"=> "1 Hacker Way, Menlo Park, CA 94025 USA",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Uniforms / Production Safety Suites",
              "supplier_name"=> "Feshan Phils.Inc.",
              "address"=> "-",
              "contact_number"=> "T=> 492.6989 /428.8784",
              "email"=> "E=> che@feshanphils.com",
              "contact_person"=> "Cherrie Anne Olivera",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Flower Shop",
              "supplier_name"=> "Floral Design",
              "address"=> "-",
              "contact_number"=> "T=> +63 2 751.2011 / 890.5922",
              "email"=> "-",
              "contact_person"=> "Joan / Rey",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "3rd party service provider and generate Aurotech PO for Option II=> With Trucking. Replacement of Ion Exchange Resin",
              "supplier_name"=> "Fluid Systems & Design, Inc.",
              "address"=> "Unit 6A14 Victoria Station 1, No. 793 EDSA,  GMA Kamuning, Diliman, Quezon City",
              "contact_number"=> "T=> 02.756.5055  / TL=> 02.234-5198",
              "email"=> "fsdi888@hotmail.ph",
              "contact_person"=> "Randy R. Rabara",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "3rd party service provider and generate Aurotech PO for Option II=> With Trucking. Replacement of Ion Exchange Resin",
              "supplier_name"=> "Fluid Systems & Design, Inc.",
              "address"=> "Unit 6A14 Victoria Station 1, No. 793 EDSA,  GMA Kamuning, Diliman, Quezon City",
              "contact_number"=> "T=> 02.756.5055  / TL=> 02.234-5198",
              "email"=> "fsdi888@hotmail.ph",
              "contact_person"=> "Marilyn Castro",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "Fravinz Construction",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "E=> sales@fravinz.com",
              "contact_person"=> "Camille",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "GALAXY TIME INC.",
              "address"=> "GFF-13 G/F Bldg. E. Solenad 3 Sta. Rosa 4026 City of Santa Rosa",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Internet and Mobile Provider",
              "supplier_name"=> "Globe",
              "address"=> "63 917 797 4087",
              "contact_number"=> "Aileen Solinap",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "AIRCON MAINTENANCE & SERVICES",
              "supplier_name"=> "GO Forward Pest Control",
              "address"=> "Unit 3, Blk22 Lot29 Ph1C Main Road, Centro de San Lorenzo Subd. Sta.Rosa Laguna",
              "contact_number"=> "049-2582-723",
              "email"=> "E=> santa.rosa.gofirwardpestcontrol@gamil.com",
              "contact_person"=> "Ms. Laica",
              "payment_terms"=> "7days"
            ],
            [
              "business_type"=> "Subscription",
              "supplier_name"=> "GoDaddy",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Insurance (Life)",
              "supplier_name"=> "Gotuaco Del Rosario",
              "address"=> "-",
              "contact_number"=> "+632.888 0009 to 10 / 662.3643 loc 835 / 662.3640 (DL)",
              "email"=> "alyssadelacruz@gra-insurancebrokers.com",
              "contact_person"=> "Alyssa Dela Cruz",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Restaurant & Catering Services",
              "supplier_name"=> "Gourmet Palate",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "gourmetpalate@yahoo.com",
              "contact_person"=> "Marissa or Javy Legarda",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "GIVEAWAYS",
              "supplier_name"=> "GRAPIKA IMPRENTA PRINTING SERVICES",
              "address"=> "Blk 10 Lot 23 Blueberry St., Sta. Rosa Homes Dita 4026 City of Sta. Rosa, Laguna",
              "contact_number"=> "M=> 09477996767",
              "email"=> "-",
              "contact_person"=> "Ian Moratalla",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Environmental Supplies",
              "supplier_name"=> "Green Chemicals Corporation",
              "address"=> "Unit 2-LS-14, 2/F Paseo 3A Paseo Outlets Paseo De Sta. Rosa, Greenfield City, Brgy. Don Jose, Sta. Rosa City, Laguna, 4026 Philippines",
              "contact_number"=> "-",
              "email"=> "E=> info@greenchem.com.ph",
              "contact_person"=> "Elaine Villano",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Leassor",
              "supplier_name"=> "Greenfields Development Corporation (Engr. Dept.)",
              "address"=> "Greenfield City, Santa Rosa - Tagaytay Rd, Don Jose, Santa Rosa, 4026 Laguna, Philippines",
              "contact_number"=> "(049) 541 2845\r\n(63 2)-8-631-8651",
              "email"=> "E=> aobugayong@greenfield.com.ph",
              "contact_person"=> "Ana O. Bugayong",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Leassor",
              "supplier_name"=> "Greenfields Development Corporation (Maintenance Dept.)",
              "address"=> "Greenfield City, Santa Rosa - Tagaytay Rd, Don Jose, Santa Rosa, 4026 Laguna, Philippines",
              "contact_number"=> "-",
              "email"=> "E=> inquire@greenfield.com.ph",
              "contact_person"=> "Santiago Idante",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Leassor",
              "supplier_name"=> "Greenfields Development Corporation (Stickering Dept.)",
              "address"=> "Greenfield City, Santa Rosa - Tagaytay Rd, Don Jose, Santa Rosa, 4026 Laguna, Philippines",
              "contact_number"=> "-",
              "email"=> "E=> gcd.stickering@greenfield.com.ph",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Import and Export Products",
              "supplier_name"=> "Gregan 101 Corporation",
              "address"=> "Unit301/3F, CTP Alpha Tower, Investment Dr., Madrigal Business Park, Ayala Alabang, Muntinlupa City, Philippines",
              "contact_number"=> "T=>  2 8850 3690",
              "email"=> "chris.abas@gramansgroup.com",
              "contact_person"=> "Christopher G. Abas",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "Health & Safety Supplies",
              "supplier_name"=> "Gregan 101 Corporation (Abbott Laboratories)",
              "address"=> "Unit301/3F, CTP Alpha Tower, Investment Dr., Madrigal Business Park, Ayala Alabang, Muntinlupa City, Philippines",
              "contact_number"=> "T=>  2 8850 3690",
              "email"=> "chris.abas@gramansgroup.com",
              "contact_person"=> "Christopher G. Abas",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "Uniforms / Production Safety Suites",
              "supplier_name"=> "Hanlex Fashion Collections",
              "address"=> "Kilometer 30, National Road Barangay Tunasan, Muntinlupa, 1773 Metro Manila",
              "contact_number"=> "-",
              "email"=> "E=> hanlexfashion@ymail.com",
              "contact_person"=> "Rose Olayvar",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Printed Forms",
              "supplier_name"=> "Happy Oranges",
              "address"=> "-",
              "contact_number"=> "+63.2.576.9628 / 506.0588",
              "email"=> "happyoranges2010@gmail.com / happyoranges_souvenirshop@yahoo.com / pc2happyoranges@yahoo.com",
              "contact_person"=> "Vivian Casaclang / Willyn Bolo",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Coaching Services",
              "supplier_name"=> "Haraya Coaching / Business Hat, Inc.",
              "address"=> "7th Flr. Finman Center 131 Tordesilla St. Brgy. Bel-Air Makati City 1209, Philippines",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Driving Certification",
              "supplier_name"=> "Honda Driving Training Center",
              "address"=> "Lot 34 Phase 1-B Road 3 First Philippine Industrial Park Tanauan City, BATANGAS 4232, PH",
              "contact_number"=> "T=> (02) 8838-0814 / 8838-5355",
              "email"=> "E=> customerservice@hondaph.com",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Account Bank Branch",
              "supplier_name"=> "HSBC-Corporate",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "jgarcia@hsbc.com.ph",
              "contact_person"=> "Sharon Garcia",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Account Bank Branch",
              "supplier_name"=> "HSBC-Corporate",
              "address"=> "-",
              "contact_number"=> "+632.807.4756",
              "email"=> "-",
              "contact_person"=> "Edna \"Bubut\" Reyes",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Account Bank Branch",
              "supplier_name"=> "HSBC-Corporate",
              "address"=> "-",
              "contact_number"=> "+632.842.1406",
              "email"=> "-",
              "contact_person"=> "Tin",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Account Bank Branch",
              "supplier_name"=> "HSBC-Corporate",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "marsabrion@hsbc.com.ph",
              "contact_person"=> "Mars Brion",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Account Bank Branch",
              "supplier_name"=> "HSBC-Corporate",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "spmnl@hsbc.com.ph",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "AIRCON MAINTENANCE & SERVICES",
              "supplier_name"=> "HVAC Glenaire Aircon and Refrigeration services",
              "address"=> "National highway, Santa Rosa, 4026 Laguna",
              "contact_number"=> "0908 904 7961",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Google Workspace provider",
              "supplier_name"=> "I4 Asia Incorporated",
              "address"=> "Strata 100, Unit 2014, Building Emerald Ave., Ortigas Center, Pasig City 1605",
              "contact_number"=> "T=> (02) 631-2518",
              "email"=> "E=> gchavez@i4asiacorp.com",
              "contact_person"=> "Gilly Chavez",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "Google Workspace provider",
              "supplier_name"=> "I4 Asia Incorporated",
              "address"=> "Strata 100, Unit 2014, Building Emerald Ave., Ortigas Center, Pasig City 1605",
              "contact_number"=> "T=> (02) 631-2518",
              "email"=> "E=> blue@i4asiacorp.com",
              "contact_person"=> "Blu Gallardo",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "Uniforms / Production Safety Suites",
              "supplier_name"=> "I-Bea Marketing",
              "address"=> "-",
              "contact_number"=> "T=> 757.4408 / 757.4406",
              "email"=> "E=> aprilyn.manlao@yahoo.com",
              "contact_person"=> "Aprilyn Manlao",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Security Services",
              "supplier_name"=> "Integrated Safeguard Security Agency Inc.",
              "address"=> "Room 401 One Greenhills Shopping Plaza\r\n5 Eisenhower Street, Greenhills, San Juan, Metro Manila, Philippines 1504",
              "contact_number"=> "-",
              "email"=> "issai.operations@gmail.com, safeguard_group@hotmail.com, sisco@info.com.ph",
              "contact_person"=> "Erani L.Naval",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Security Services",
              "supplier_name"=> "Integrated Safeguard Security Agency Inc.",
              "address"=> "Room 202 One Greenhills Shopping Plaza\r\n5 Eisenhower Street, Greenhills, San Juan, Metro Manila, Philippines 1504",
              "contact_number"=> "T=> +63 2 9427129\r\n+63 2 9427114\r\n+63 2 5316990\r\nFax=>\r\n+63 2 5315126\r\nemail=>\r\nsafeguard_group@hotmail.com\r\nsisco@info.com.ph",
              "email"=> "T=> +63 2 9427129\r\n+63 2 9427114\r\n+63 2 5316990\r\nFax=>\r\n+63 2 5315126\r\nemail=>\r\nsafeguard_group@hotmail.com\r\nsisco@info.com.ph",
              "contact_person"=> "Joseph",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "Intergrated Safegaurd Security Agency Inc.",
              "address"=> "Room 202 One Greenhills Shopping Plaza, #5 Eisenhower Street, Greenhills, San Juan, Metro Manila, Philippines 1504",
              "contact_number"=> "T=> +63 2 9427129 / +63 2 9427114 / +63 2 5316990",
              "email"=> "E=> safeguard_group@hotmail.com / \r\nsisco@info.com.ph",
              "contact_person"=> "Sir. Naval",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Music Supplier",
              "supplier_name"=> "Intune Pro Music Center",
              "address"=> "+632 775 0595",
              "contact_number"=> "Arley A. Abiado",
              "email"=> "-",
              "contact_person"=> "+632 775 0595",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Consumables",
              "supplier_name"=> "IronFort, Inc.",
              "address"=> "+63.2.706.1404",
              "contact_number"=> "Mercy Cruz",
              "email"=> "-",
              "contact_person"=> "+63.2.706.1404",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Uniforms / Production Safety Suites",
              "supplier_name"=> "Jahrenziah International Corp",
              "address"=> "-",
              "contact_number"=> "T=> 801 3479 / 801 3899",
              "email"=> "-",
              "contact_person"=> "Sheila Arciaga",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Contractor (Facilities)",
              "supplier_name"=> "Jimuel Raya",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "jimuelraya84@gmail.com",
              "contact_person"=> "Jimuel Raya",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Outsource Agencies",
              "supplier_name"=> "Jobstreet",
              "address"=> "-",
              "contact_number"=> "T=>  286.6222 loc 4604 / 637.2208",
              "email"=> "E=> michele.castor@jobstreet.com",
              "contact_person"=> "Michelle Castor (AM) ",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Employee",
              "supplier_name"=> "June V. Cabalo",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "HRD Solutions (Biometrics)",
              "supplier_name"=> "JUPITER SYSTEMS INC.",
              "address"=> "3/F Don Pablo Bldg, 114 Amorsolo Street, Legaspi Village, Makati City, Metro Manila 1229, PH",
              "contact_number"=> "+632.5328.3343 / +632.8812.6149",
              "email"=> "sales@jupitersystems.com",
              "contact_person"=> "Jhessa Marie Encinas",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Office & Panty Supplies",
              "supplier_name"=> "JWED Trading",
              "address"=> "-",
              "contact_number"=> "632 821.2154",
              "email"=> "ehamotorshop@yahoo.com",
              "contact_person"=> "Edith Alipar/",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "AIRCON MAINTENANCE & SERVICES",
              "supplier_name"=> "K&K AeroCool Aircon Services",
              "address"=> "Blk 4 Lexus St Phase 4 Olivarez Homes South, Biñan, Laguna",
              "contact_number"=> "0956 092 5561",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Tools & Equipments",
              "supplier_name"=> "Kamogawa Commerce & Services, Inc.",
              "address"=> "109 Relta Building Lot 9, 11, 14A & 15 Blk. 82, Bel Air 2 Santa Rosa City, Laguna, Philippines /  Unit C Metrococo Compound, Bldg. 1 Lot 3F/3G on American Road, Greenfield Automotive Park, Sta. Rosa City, Laguna, Philippines, 4026",
              "contact_number"=> "T=> (049) 544-1107 Loc. 101 / 508-3912",
              "email"=> "E=>  sales@kcsi.kamog.com.ph, sales@kcsi.kamog.com.ph, sales@kamog.com.ph",
              "contact_person"=> "Jane Rose Tuboran",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "ID Supplier",
              "supplier_name"=> "Kardco",
              "address"=> "-",
              "contact_number"=> "T=> +63 2.810.1790 / 893.2641/42/43",
              "email"=> "chitodizon_kardco@yahoo.com",
              "contact_person"=> "Chito Dizon",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "AIRCON MAINTENANCE & SERVICES",
              "supplier_name"=> "Karesma Air-conditioning System Enterprises",
              "address"=> "73PW+MHP, San Lorenzo Rd, Balibago, Santa Rosa, Laguna",
              "contact_number"=> "0908 889 2364",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Contractor (Facilities)",
              "supplier_name"=> "KD CORTEZ Construction",
              "address"=> "2nd Floor Sanfel Bldg. Marisol, Angeles City, Pampanga",
              "contact_number"=> "M=> 0998 859 6558 / 0936 936 3561",
              "email"=> "kdcortezconstruction@gmail.com",
              "contact_person"=> "Engr. Kenneth Cortez",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "AIRCON MAINTENANCE & SERVICES",
              "supplier_name"=> "Keep and Fix Cleanic, Inc.",
              "address"=> "24 F. Gomez St, Santa Rosa, 4026 Laguna",
              "contact_number"=> "0905 546 0886",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Restaurant & Catering Services",
              "supplier_name"=> "Kitchen City",
              "address"=> "-",
              "contact_number"=> "T=> 919 5288",
              "email"=> "nikki.buan@kitchencity-inc.com",
              "contact_person"=> "Nikki Buan",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Office Filing Supplies",
              "supplier_name"=> "Komstak Inc.",
              "address"=> "No. 488-A N.S. Amoranto St. Quezon City , 1114 Philippines",
              "contact_number"=> "632 741.2012 / 741-5753 / D.L. 8 697-2016",
              "email"=> "sales@komstak.com.ph",
              "contact_person"=> "Terry J. King",
              "payment_terms"=> "15days"
            ],
            [
              "business_type"=> "Packaging Supplies",
              "supplier_name"=> "KP88 Packaging and Gen. Mdse. Corporation",
              "address"=> "L30 B4 Ph3B Pacita 1 Archery Drive, Brgy. San Francisco, Binan City",
              "contact_number"=> "(02) 847 2304",
              "email"=> "-",
              "contact_person"=> "Camille, Ayen",
              "payment_terms"=> "30 days"
            ],
            [
              "business_type"=> "Contractor (Facilities)",
              "supplier_name"=> "L2 Konstruct Engineering Services",
              "address"=> "No. 190-A Saint Peter Street De Mesa Compound Alabang, Muntinlupa City",
              "contact_number"=> "T=> 8 478 5679",
              "email"=> "E=> l2konstruct@gmail.com",
              "contact_person"=> "Howard Luna",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "General Physician",
              "supplier_name"=> "Laguna TechnoMed Medical Clinic & Laboratory",
              "address"=> "Unit 10415 Technopark Square, Gate 3 Laguna Techopark Inc. Brgy. Biñan, Biñan, Laguna",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "Gina Gallenero",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Office & Panty Supplies",
              "supplier_name"=> "Laval Office Supplies Trading",
              "address"=> "Unit 1D RLI Bldg., South Point Subd, Brgy. Banay-Banay, Cabuyao, Laguna",
              "contact_number"=> "T=> (049) 530 6055",
              "email"=> "E=> laval.officesupplies@yahoo.com",
              "contact_person"=> "Sheryl Lavina / Shaline Jane Austria",
              "payment_terms"=> "15 days"
            ],
            [
              "business_type"=> "Printing Solutions",
              "supplier_name"=> "Lenrick Illusion Graphics and Trading",
              "address"=> "No. 222 Posadas Ave., Corner Miraculous Medal St. Sucat, Muntinlupa City",
              "contact_number"=> "T=> (02) 508 71 83",
              "email"=> "E=> lrigatrading019@yahoo.com",
              "contact_person"=> "Lenie R. Ramos",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Subscription",
              "supplier_name"=> "LinkedIn",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Online Market",
              "supplier_name"=> "Lucrest Marketing ",
              "address"=> "1200 A. Lorenzo Jr St, Tondo, Manila, 1014 Metro Manila",
              "contact_number"=> "N.A.",
              "email"=> "A=> shop@lucrest.com",
              "contact_person"=> "N.A.",
              "payment_terms"=> "N.A."
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "MAEXX2 Enterprises Inc.",
              "address"=> "Ph1 Blk 3 Lot 20 Brgy. Milagrosa Carmona Cavite 4116 Cavite, Phils.\r\n\r\nPhase 2 Blk 1 Lot 3 Carmona Estates Brgy. Lantic Carmona 4116 Cavite, Phils.",
              "contact_number"=> "T=>=> 046 404-5534",
              "email"=> "E=> myla.maexx@outlook.com / myla.maexx2@gmail.com",
              "contact_person"=> "Myla Vispo",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Mailer Lite",
              "address"=> "email Blasting",
              "contact_number"=> "-",
              "email"=> "Via Online Purchase",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Contractor (Facilities)",
              "supplier_name"=> "Mason",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "Edwin",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Maximum Solutions Corporation",
              "address"=> "184 San Luis, Brgy. Tibagan, San Juan City, Metro Manila 1500",
              "contact_number"=> "(02) 8403 0983 / 8899 8018 / 77510939",
              "email"=> "E=> vlansang@mscorp.com.ph / ctayam@mscorp.com.ph /  inquiry@mscorp.com.ph",
              "contact_person"=> "Vilma Lansang / Cathy Tayam",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "Office Pantry Supplies",
              "supplier_name"=> "MCY Trading",
              "address"=> "122 Cadena de Amor St. San Jose Village 2, Binan Laguna",
              "contact_number"=> "(049) 549-5349",
              "email"=> "E=> mcy_trading02@yahoo.com / mcy_trading@yahoo.com",
              "contact_person"=> "Chryslynd Gonzales ",
              "payment_terms"=> "30 days"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "MDI (Micro-D International, Inc.",
              "address"=> "+632.812.21.24",
              "contact_number"=> "Mary Krislyn Cruz",
              "email"=> "-",
              "contact_person"=> "+632.893.7377",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Media Soft",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Printed Forms  (AC Checks accredited by BDO)",
              "supplier_name"=> "Mercury International",
              "address"=> "-",
              "contact_number"=> "+63.2.732.2083 / 711.4429 / 732.2144",
              "email"=> "mispcint@gmail.com",
              "contact_person"=> "Gretchen Alcantara",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "MetroPrint",
              "address"=> "Unit 301, Auro-Vir Plaza Bldg\r\n1695 Evangelista Makati\r\n1200 Metro Manila",
              "contact_number"=> "-",
              "email"=> "info@metroprint.ph",
              "contact_person"=> "Hally Navarro",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "HRD Solutions (Payroll provider)",
              "supplier_name"=> "Metrosoft Inc (MSI",
              "address"=> "+632.892.4536",
              "contact_number"=> "Elly/Technical",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Souveneers",
              "supplier_name"=> "MEZAVERDE ENTERPRISES",
              "address"=> "Blk. 84 Lot 21-B Yen St. Ph-8 North Fairview, Quezon City",
              "contact_number"=> "T=> 046 417 1970 (Cavite Line)",
              "email"=> "E=> meza_enterprises@yahoo.com",
              "contact_person"=> "Nena M. Nuniza",
              "payment_terms"=> "50%-DP / 50% upon delivery"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Micro Image International Corp.",
              "address"=> "Unit 53 & 101 Legaspi Suites Building178 Salcedo St., Legaspi Village Makati City 1229 ",
              "contact_number"=> "T=> 7-752-4525 / 8-840-4323",
              "email"=> "E=> cventura@microimageph.com",
              "contact_person"=> "Cavin Ventura",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Micro Image International Corp.",
              "address"=> "Unit 53 & 101 Legaspi Suites Building178 Salcedo St., Legaspi Village Makati City 1229 ",
              "contact_number"=> "T=> 7-752-4525 | 8-840-4323 loc. 158 ",
              "email"=> "E=> jbayani@microimageph.com",
              "contact_person"=> "Joy de Leon /Bryan Verdadero",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Micro Pacific Technologies & Systems Corporation",
              "address"=> "2/F Chemphil Building 851 A. Arnaiz Avenue, Bargy. San Lorenzo Legaspi Village, Makati City 1229 Philippines",
              "contact_number"=> "T=> 840.4563 / 840.4601 / 840.4787",
              "email"=> "E=> sales@micropacific.net / seclarino@micropacific.net",
              "contact_person"=> "Sheryl Eclarino / Jerry Noceja",
              "payment_terms"=> "COD (Cash/Check)"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Micro Pacific Technologies & Systems Corporation",
              "address"=> "2/F Chemphil Building 851 A. Arnaiz Avenue, Bargy. San Lorenzo Legaspi Village, Makati City 1229 Philippines",
              "contact_number"=> "T=> 840.4563 / 840.4601 / 840.4787",
              "email"=> "E=> seclarino@micropacific.net",
              "contact_person"=> "Sheryl Eclarino",
              "payment_terms"=> "COD (Cash/Check)"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Microgenesis Business Systems",
              "address"=> "U1007 Paragon Plaza Condominium 162 EDSA cor. Reliance Street, 1550 Mandaluyong City, Philippines",
              "contact_number"=> "T=> +632 86587000",
              "email"=> "E=> jenny.bandavia@mgenesis.com",
              "contact_person"=> "Jenny Bandavia",
              "payment_terms"=> "30 days"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Microphase Corporation",
              "address"=> "11th Floor Legaspi Suites Bldg., 178 Salcedo Street, Legaspi Village, Makati City",
              "contact_number"=> "+632.812.8814 or +632.750.0827 loc 108 / '+632.750.0825",
              "email"=> "-",
              "contact_person"=> "Michelle Montecillo / Nel",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "IT Solutions (HP INK Toner)",
              "supplier_name"=> "Microphase Corporation",
              "address"=> "11th Floor Legaspi Suites Bldg., 178 Salcedo Street, Legaspi Village, Makati City",
              "contact_number"=> "T=> 812.8814 loc 101 or 318",
              "email"=> "-",
              "contact_person"=> "Beth Bayona/Bel Borja",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Printing Solutions",
              "supplier_name"=> "MIMILOVE'S PRINTING SERVICES",
              "address"=> "3F Room 3T Golden Valley Bldg. C.M. Recto Avenue, Sta Cruz, Manila",
              "contact_number"=> "M=> 09567000580 / 09054251963",
              "email"=> "E=> mimilovesprintingservices@gmail.com",
              "contact_person"=> "Cathy Cabanganan",
              "payment_terms"=> "50% DP"
            ],
            [
              "business_type"=> "Printing Solutions",
              "supplier_name"=> "Misibis Printing Services",
              "address"=> "4065 ME San Vicente Brgy. San Vincente Biñan Laguna, 4024 Binãn, Philippines",
              "contact_number"=> "T=> (02) 8763-36933",
              "email"=> "E=> misibisprints@gmail.com",
              "contact_person"=> "Mae Cadete / Napoleon B. Perena",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Uniforms / Production Safety Suites",
              "supplier_name"=> "MMCL Tech Phils. Corporation",
              "address"=> "Blk. 10 Lot 8 Jeremiah St. Saint Agustine Village, Brgy. Lawa, Calamba, Laguna",
              "contact_number"=> "-",
              "email"=> "E=> mhel.apuya@yahoo.com",
              "contact_person"=> "Mhel Apuya",
              "payment_terms"=> "50% DP"
            ],
            [
              "business_type"=> "Uniforms / Production Safety Suites",
              "supplier_name"=> "Model Fashion Collection",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "E=> michelle_amaro14@yahoo.com.ph",
              "contact_person"=> "Michelle Amaro",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Tools & Equipments",
              "supplier_name"=> "MONOTARO CO., LTD",
              "address"=> "Prologis Park Inagawa 1, 101-1 Azakodani Sashikumi, Kawebegun Inagawacho, Hyogo 666-0253, Japan",
              "contact_number"=> "T=> +81-6-4869-7189",
              "email"=> "E=> support@cs.gb.monotaro.com",
              "contact_person"=> "N.A.",
              "payment_terms"=> "N.A."
            ],
            [
              "business_type"=> "Safety",
              "supplier_name"=> "MRB Estelope Trading And Services Incorporated",
              "address"=> "11135 JM Loyola ST. Mabuhay Carmona Cavite 4116",
              "contact_number"=> "T=> (02) 8533-2765 / (02) 8475-6729",
              "email"=> "E=> lotusfireextinguisher@yahoo.com / gemma.lotus@mrdestelope.com ",
              "contact_person"=> "Gemm Aguilar",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "MRS PRECISION SOLUTION TRADE & SERVICES CORP.",
              "address"=> "Purok 1, Brgy. Lalaan 2nd Silang, Cavite, Philippines 4118",
              "contact_number"=> "T=> 046 430 5477",
              "email"=> "-",
              "contact_person"=> "Kyra Renei Armintia",
              "payment_terms"=> "30days"
            ],
            [
              "business_type"=> "Contractor (Facilities)",
              "supplier_name"=> "N-Ave Architectural Design and Construction",
              "address"=> "3rd Flr. EJE Bldg., Lot 2-C4, Sta. Rosa Tagaytay Road., Brgy. Putting Kahoy, Silang, Cavite 4118",
              "contact_number"=> "-",
              "email"=> "E=> napolitano.aivie@nave.com.ph info@nave.com.ph",
              "contact_person"=> "Arch. Aivie Dianne C. Napolitano",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Contractor (Facilities)",
              "supplier_name"=> "N-Ave Architectural Design and Construction",
              "address"=> "3rd Flr. EJE Bldg., Lot 2-C4, Sta. Rosa Tagaytay Road., Brgy. Putting Kahoy, Silang, Cavite 4118",
              "contact_number"=> "-",
              "email"=> "E=> ocampo.nikko@nave.com.ph info@nave.com.ph",
              "contact_person"=> "Arch. Nikko Ocampo",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "General Contructor",
              "supplier_name"=> "N-AVE Architectural Design and Construction",
              "address"=> "3rd Flr. EJE Bldg., Lot 2-C4, Sta. Rosa - Tagaytay Road, Brgy. Putting Kahoy, Silang, Cavite 4118 Philippines",
              "contact_number"=> "-",
              "email"=> "E=> napolitano.aivie@nave.com.ph / info@nave.com.ph",
              "contact_person"=> "Arch. Aivie Napolitano",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Insurance (Non-Life)",
              "supplier_name"=> "New Canaan Insurance Agency, Inc.",
              "address"=> "3F BMG Centre, Paseo De Magallanes, Makati City",
              "contact_number"=> "T=> (02) 8531245 - 47",
              "email"=> "E=> fsm@newcanaaninsurance.com",
              "contact_person"=> "Fatima \"Aima\" S. Medina",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Insurance (Non-Life)",
              "supplier_name"=> "New Canaan Insurance Agency, Inc.",
              "address"=> "-",
              "contact_number"=> "-",
              "email"=> "E=> mdc@newcanaaninsurance.com",
              "contact_person"=> "Mhydo D. Coronel",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Structured network cabling and equipment solution",
              "supplier_name"=> "New Generation Link Contracting & Trading Services, Inc.",
              "address"=> "2F Westgate Tower 1709 Investment Drive Madrigal Business Park Ayala Alabang\r\nMuntinlupa City, Philippiens",
              "contact_number"=> "T=> +632 88213699",
              "email"=> "E=> jeanpaul.dulay@newgenlink.com.ph, joebert.gozon@newgenlink.com.ph, jasonklim.bacus@newgenlink.com.ph, sales@newgenlink.com.ph",
              "contact_person"=> "Jean Paul H. Dulay / Jobert Gozon /  Jason Klim Bacus",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Insurance (Non-Life)",
              "supplier_name"=> "Ni-gatsu Saisei Corporation",
              "address"=> "15 L18 P1 Georgetown Heights Molino IV Bacoor, Cavite\r\nTIN=> 007-212-136-000",
              "contact_number"=> "-",
              "email"=> "E=> operations@nigatsucorp.net",
              "contact_person"=> "Jorge Manapat",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Novulutions Inc.",
              "address"=> "35th Floor Eco Tower Bldg., Bonifacio Global City, 32nd St., cor 9th Ave., Fort Bonifacio, Taguig City, Metro Manila",
              "contact_number"=> "+632 8883 6169",
              "email"=> "ronna@novulutions.com",
              "contact_person"=> "Ronnalyn de Villa",
              "payment_terms"=> "Immediate"
            ],
            [
              "business_type"=> "ESD Shoes and more",
              "supplier_name"=> "NuPon Technology",
              "address"=> "Filsyn Compound Brgy Don Jose, City Of Santa Rosa 4026 Laguna,Philippines",
              "contact_number"=> "-",
              "email"=> "E=> cs18@nuponcorp.net",
              "contact_person"=> "Ysa Aguilar",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Restaurant & Catering Services",
              "supplier_name"=> "Olive Tree Kitchen & Bar",
              "address"=> "-",
              "contact_number"=> "T=> 823.0366",
              "email"=> "-",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Office & Panty Supplies",
              "supplier_name"=> "OMI Office Products Inc.",
              "address"=> "-",
              "contact_number"=> "632 825.7595",
              "email"=> "emmarieborja@gmail.com",
              "contact_person"=> "Emmarie D. Borja \"Rhia\"",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "INSURANCE",
              "supplier_name"=> "OMNIVERSAL ASSURANCE AGENCY CORP.",
              "address"=> "Unit 3, Altrove Business Center, Brgy. Bayanan, Bacoor Blvd., Bacoor City, Cavite 4102",
              "contact_number"=> "T=> (046) 851-3536 ",
              "email"=> "rdelino@ovaa.net",
              "contact_person"=> "Rod B. Delino",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Precision Machined parts",
              "supplier_name"=> "Onatech Incorporated",
              "address"=> "No. 0544 J.P. Rizal Street, Sta. Barbara Baliuag, Bulacan Philippines 3006\r\n\r\n \r\n\r\n CAVITE PLANT=>\r\n#12 Makiling Street, Mountainview Industrial Complex, Brgy. Bancal, Carmona Cavity 4116 Philippines",
              "contact_number"=> "T=> 666.3791 / +63 2 666.3793 / +63 2 666.3705 / +63 44 766.0831 / +63 44 764.9891",
              "email"=> "E=> sales@onatech.com.ph",
              "contact_person"=> "Dennis S. Barcelona",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "PDF Complete Editor",
              "address"=> "501 Congress Ave, Ste. 150\r\nAustin, TX 78701",
              "contact_number"=> "-",
              "email"=> "E=> support@pdfcomplete.com (Support) / sales@pdfcomplete.com (Sales)",
              "contact_person"=> "-",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "PEOPLE MANAGEMENT ASSOCIATION OF THE PHILIPPINES",
              "address"=> "670 Lee Street, Brgy. Addition Hills, Mandaluyong City, Philippines",
              "contact_number"=> "T=> +63 (2) 8288-9478",
              "email"=> "pmap@pmap.org.ph",
              "contact_person"=> "Janielle Ann M. Chan",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "-",
              "supplier_name"=> "PEREZONIC ENGINEERING SERVICES",
              "address"=> "Villa Vicencio St. Barangay Tabe, Guiguinto, Bulacan",
              "contact_number"=> "T=>(044) 794-3766",
              "email"=> "E=> perezonic@yahoo.com / accounting_perezonic@yahoo.com",
              "contact_person"=> "Luis M. Perez",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "Pest and Disinfecting Works",
              "supplier_name"=> "Pesticon Enterprises Inc.",
              "address"=> "3/F EP Sanchez Bldg 1, 8301 – A Dr. Arcadio Santos Ave,\r\nSan Antonio, Paranaque City, 1715",
              "contact_number"=> "(02) 782-6909\r\n(02) 8804-3452",
              "email"=> "E=> pesticon_ent@yahoo.com.ph / pesticon.schedule@yahoo.com.ph",
              "contact_person"=> "Ms. Joy",
              "payment_terms"=> "-"
            ],
            [
              "business_type"=> "ID Printer Machine and Toner",
              "supplier_name"=> "PHILCOPY CORPORATION",
              "address"=> "793 J. P. Rizal Ave., Makati City",
              "contact_number"=> "T=> (02) 217-9087",
              "email"=> "E=> info@philcopy.net / sales@philcopy.net / jessica.cadahing@philcopy.net",
              "contact_person"=> "Jessica Cadahing",
              "payment_terms"=> "15 days"
            ],
            [
              "business_type"=> "IT Solutions",
              "supplier_name"=> "Phil-Data Business Systems, Inc.",
              "address"=> "King's Court Building 1, 3F, 2129 Chino Roces Ave, Makati, 1231 Metro Manila",
              "contact_number"=> "(02) 8811 2878",
              "email"=> "E=> DebbieE@phildata.com",
              "contact_person"=> "Debbie Eusebio",
              "payment_terms"=> "-"
            ]
        ];
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "PHILIPPINE ELECTRONICA & SEMICONDUCTOR SUPPLIERS' ASSOCIATION",
        //       "address"=> "No. 1 Mon-El St. Mon-El Subdivision, San Antonio Sucat Parañaque Metro Manila 1700",
        //       "contact_number"=> "T632 6973352 / M+639176228623",
        //       "email"=> "pessa_secretariat@yahoo.com",
        //       "contact_person"=> "Rodolfo Rigor",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Visual Prints and Equipments",
        //       "supplier_name"=> "Photoline (SM Sta. Rosa Laguna)",
        //       "address"=> "SM City Santa Rosa, Manila S Rd, Santa Rosa, Laguna",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Contractor (Facilities)",
        //       "supplier_name"=> "Pintor",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "Duro Duemedes",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Outsource Agencies",
        //       "supplier_name"=> "Pipols Synergy Management Services Inc",
        //       "address"=> "2nd Floor, Elizabeth Center Building, National Road, Putatan, Muntinlupa, 1770 Metro Manila",
        //       "contact_number"=> "T=> 8862 0719 / 8862 3458 / ",
        //       "email"=> "E=> scb.pipols@gmail.com",
        //       "contact_person"=> "Syra C. Belleca",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Internet and Mobile Provider",
        //       "supplier_name"=> "PLDT",
        //       "address"=> "+632 8224131 ",
        //       "contact_number"=> "Carl Louise S. Almendarez",
        //       "email"=> "-",
        //       "contact_person"=> "+632 860 6626",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Internet and Mobile Provider",
        //       "supplier_name"=> "PLDT Billing",
        //       "address"=> "+632 631.1314",
        //       "contact_number"=> "Ma. Lorraine B. Ines",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Internet and Mobile Provider",
        //       "supplier_name"=> "PLDT Enterprise",
        //       "address"=> "PLDT MGO, Dela Rosa Street, Legazpi Village, Makati, 1228 Metro Manila",
        //       "contact_number"=> "-",
        //       "email"=> "E=> jrbauza@pldt.com.ph",
        //       "contact_person"=> "Jovie Bauza",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Internet and Mobile Provider",
        //       "supplier_name"=> "PLDT Enterprise",
        //       "address"=> "PLDT MGO, Dela Rosa Street, Legazpi Village, Makati, 1228 Metro Manila",
        //       "contact_number"=> "-",
        //       "email"=> "E=> alfernandez@pldt.com.ph",
        //       "contact_person"=> "Anthony L Fernandez",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Plumbing and Sanitation Services",
        //       "supplier_name"=> "Plumber",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "Pol Ladera",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Gift Certificates",
        //       "supplier_name"=> "Pluxee ( a SODEXO Company)",
        //       "address"=> "11th Floor B.A. Lepanto Building 8747 Paseo de Roxas Street, Makati City, Philippines",
        //       "contact_number"=> "T=> (632) 8 689-4700",
        //       "email"=> "E=> ben.barin@sodexo.com",
        //       "contact_person"=> "Ann Lavapie",
        //       "payment_terms"=> "COD"
        //     ],
        //     [
        //       "business_type"=> "Service Maintenance",
        //       "supplier_name"=> "Prens",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Visual Prints",
        //       "supplier_name"=> "PRINT IDEAS",
        //       "address"=> " 25 Sapphire St., Pacita Complex I, San Pedro Laguna",
        //       "contact_number"=> "M=>0916 500 2898",
        //       "email"=> "printideascompany@gmail.com",
        //       "contact_person"=> "Mary Grace De Torres",
        //       "payment_terms"=> "50% dp"
        //     ],
        //     [
        //       "business_type"=> "Visual Prints",
        //       "supplier_name"=> "Printixels Enterprise ™",
        //       "address"=> "412 J.M. Loyola Street, Carmona, Cavite 4116 Philippines",
        //       "contact_number"=> "T=> (046) 430-3546 (PLDT)",
        //       "email"=> "E=> printixels@gmail.com",
        //       "contact_person"=> "Nestor Mapanoo",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "P-tech People and Technology Inc.",
        //       "address"=> "Level 10-1 One Global Place 25th Street & 5th Avenue Bonifacio Global City 1634 Philippines",
        //       "contact_number"=> "T=>  3-224-4160",
        //       "email"=> "E=> contactus@ptech.com.ph",
        //       "contact_person"=> "Camille Cortez",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "IT Solutions",
        //       "supplier_name"=> "Quartz Business Products Corp.",
        //       "address"=> "15th Floor Capital House Building 9th Avenue corner 34th Street Global City, Taguig City 1630",
        //       "contact_number"=> "T=> +632 8424.1280 local 146",
        //       "email"=> "E=> maridel.ortega@quartz.com.ph",
        //       "contact_person"=> "Maridel Ortega",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Contractor (Facilities)",
        //       "supplier_name"=> "R&J Safety Installation Services",
        //       "address"=> "No. 44 Velasquez St. Subangdaku Mandaue City 6014",
        //       "contact_number"=> "-",
        //       "email"=> "E=> juliustdelantar@gmail.com",
        //       "contact_person"=> "Julius T. Delantar",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Printed Forms",
        //       "supplier_name"=> "Racing Print",
        //       "address"=> "-",
        //       "contact_number"=> "T=> 63 2 836.0090 / 624.5009 / 624.4917",
        //       "email"=> "racingprint09@gmail.com",
        //       "contact_person"=> "Chris",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Service Maintenance",
        //       "supplier_name"=> "Rapide Alabang",
        //       "address"=> "-",
        //       "contact_number"=> "T=> 809.6153 / +63.2.809.6323",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "General Physician",
        //       "supplier_name"=> "Ray Amelee T. Adaya, MD",
        //       "address"=> "-",
        //       "contact_number"=> "T=> 0977 248 3653",
        //       "email"=> "E=> endayaamelee@gmail.com",
        //       "contact_person"=> "Ray Amelee T. Adaya, MD",
        //       "payment_terms"=> "7 days"
        //     ],
        //     [
        //       "business_type"=> "Medical Clearance",
        //       "supplier_name"=> "Red Cross, Alabang",
        //       "address"=> "-",
        //       "contact_number"=> "T=> +63 2  809.7131 / 850.6813",
        //       "email"=> "M",
        //       "contact_person"=> "MARY ROSE M. URBANO, RN (MHAE)",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Accomodations",
        //       "supplier_name"=> "Red Planet Manila Aseana City",
        //       "address"=> "17-B Lot 38 Block 2, Bradco Avenue, Brgy. Baclaran,Paranaque City 1700, Philippines",
        //       "contact_number"=> "T=> 8 866 0888",
        //       "email"=> "-",
        //       "contact_person"=> "Brian Mayo\r\n\r\nRAMON \"Brian\" BRIGIDO MAYO",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "AIRCON MAINTENANCE & SERVICES",
        //       "supplier_name"=> "Ref & Aircon",
        //       "address"=> "74F4+243, Genesis St,. San Lorenzo South, Santa Rosa, 4026 Laguna",
        //       "contact_number"=> "0921 711 7027",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Contractor (Facilities)",
        //       "supplier_name"=> "RGD Contractor",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "Tony Narciso",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "AIRCON MAINTENANCE & SERVICES",
        //       "supplier_name"=> "RHK Enterprises",
        //       "address"=> "Bantayan Centrum, Brgy.Parian, Calamba City",
        //       "contact_number"=> "T=> 049-542-5479",
        //       "email"=> "rhk_enterprises@yahoo.com",
        //       "contact_person"=> "Noella San Buenaventura",
        //       "payment_terms"=> "15 days"
        //     ],
        //     [
        //       "business_type"=> "Insurance (HMO)",
        //       "supplier_name"=> "RIBI (Reliable Insurance Brokers, Inc.) - RFM Insurance",
        //       "address"=> "4/F RFM Corporate Center, Pioneer corner Sheridan Street, 1550 Mandaluyong City ",
        //       "contact_number"=> "T=> 8 638.8504 / 631 8101 / +632 631 9285 / +632 8631 9286",
        //       "email"=> "jdgonzales@rfm.com.ph",
        //       "contact_person"=> "Jeffrey \"Jay\" D. Gonzales",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Insurance (Non-Life)",
        //       "supplier_name"=> "RIBI (Reliable Insurance Brokers, Inc.) - RFM Insurance",
        //       "address"=> "4/F RFM Corporate Center, Pioneer corner Sheridan Street, 1550 Mandaluyong City ",
        //       "contact_number"=> "T=> 6319286",
        //       "email"=> "erromero@rfm.com.ph / info@ribi-insurance.com",
        //       "contact_person"=> "Erlyn Romero",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Contractor (Facilities)",
        //       "supplier_name"=> "RJPARAS Builders & Trading Inc.",
        //       "address"=> "2514 L7 and 8, 2nd Floor, Apo Road, L&S Subd., Sto. Domingo, Angeles City 2009",
        //       "contact_number"=> "F=> (045) 409-3712",
        //       "email"=> "-",
        //       "contact_person"=> "Engr. Richard Lorenz C. Paras",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Courier Services",
        //       "supplier_name"=> "RML",
        //       "address"=> "GGB Bldg, Pascor Drive, Paranaque City, Philippines",
        //       "contact_number"=> "T=> 887.4125",
        //       "email"=> "E=> chrisfleras24@yahoo.com",
        //       "contact_person"=> "Chris Fleras/Marketing Supervisor",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Accomodations",
        //       "supplier_name"=> "Rochelle G. Tan (RED DOOR HOUSE RENTAL)",
        //       "address"=> "#24 Wlanut Street, Laguna Bel-Air 2, Brgy. Don Jose, Sta.Rosa Laguna",
        //       "contact_number"=> "CP=> 0977-8174749 / 0919-0675871",
        //       "email"=> "E=> reddoorhouse@gmail.com",
        //       "contact_person"=> "Ms. Rochelle Tan",
        //       "payment_terms"=> "2k Deposit / 7 days before arrival"
        //     ],
        //     [
        //       "business_type"=> "Courier Services",
        //       "supplier_name"=> "RPX / Linex",
        //       "address"=> "-",
        //       "contact_number"=> "T=> 851.7698 / 851.7957",
        //       "email"=> "M",
        //       "contact_person"=> "Yancy",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Subscription",
        //       "supplier_name"=> "Rush To Rank",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "E=>rambaylon@gmail.com",
        //       "contact_person"=> "Roderick Allan Baylon",
        //       "payment_terms"=> "ASAP"
        //     ],
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "RXM DRY GOODS TRADING",
        //       "address"=> "3 Milflores St. Ceris Subd., Brgy. Canlubang, Calamba City, laguna 4027",
        //       "contact_number"=> "M=> 09326676514",
        //       "email"=> "E=> info.rxmtrading@gmail.com",
        //       "contact_person"=> "Ric Raymond P. Basila",
        //       "payment_terms"=> "50%-DP / 50% upon delivery"
        //     ],
        //     [
        //       "business_type"=> "Membership and Acceditors (Yearly)",
        //       "supplier_name"=> "S&R Membership Shopping - Nuvali",
        //       "address"=> "Santa Rosa - Tagaytay Rd, Don Jose, Santa Rosa, Laguna",
        //       "contact_number"=> "(049) 258 0888",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Accomodations",
        //       "supplier_name"=> "Seda Nuvali Hotel",
        //       "address"=> "Lakeside Evozone, NUVALI, Sta. Rosa City, Laguna, 4026, Philipplines",
        //       "contact_number"=> "T=> +6349 255 8888",
        //       "email"=> "E=> dael.john@sedahotels.com / nuv@sedahotels.comreservations.nuv@sedahotels.com / frontoffice.nuv@sedahotels.com\r\n",
        //       "contact_person"=> "JOHN HERMIE DAEL",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Membership and Acceditors (Yearly)",
        //       "supplier_name"=> "Semiconductor and Electronics Industries in the Philippines Foundation, Inc.",
        //       "address"=> "2/F Building 2, EMS Components Assembly, Inc. 117-A Technology Avenue, LTI, Biñan City, Laguna",
        //       "contact_number"=> "Helpdesk=> +63 906 559 4584 | +63 999 425 4146",
        //       "email"=> "-",
        //       "contact_person"=> "Princess Jane Leah B. Caraca",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "AIRCON MAINTENANCE & SERVICES",
        //       "supplier_name"=> "Senfrost Air-conditioning Systems Services",
        //       "address"=> "293 Congressional Rd, General Mariano Alvarez, 4117 Cavite",
        //       "contact_number"=> "0946 700 3648",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Gasoline Stations",
        //       "supplier_name"=> "Shell (Baguio, Abanao)",
        //       "address"=> "-",
        //       "contact_number"=> "+63 74 444.8182 / +63 74 619.2674",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Gasoline Stations",
        //       "supplier_name"=> "Shell (Marcos Hi-way, Baguio)",
        //       "address"=> "-",
        //       "contact_number"=> "+63 74 445.0512",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Service Maintenance",
        //       "supplier_name"=> "Shell Fleet",
        //       "address"=> "-",
        //       "contact_number"=> "T=> 878.8811",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "IT Solutions",
        //       "supplier_name"=> "Silicon Valley - SM Southmall",
        //       "address"=> "-",
        //       "contact_number"=> "T=> 632 806.9595 / 9293",
        //       "email"=> "-",
        //       "contact_person"=> "Mitch",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Shuttle Service",
        //       "supplier_name"=> "Silvercrown Shuttle Service & Car Rental",
        //       "address"=> "B26 L8 Laguna Buenavista Executive Homes, Calamba City ",
        //       "contact_number"=> "M=> 0916-715-3222",
        //       "email"=> "E=> silvercrownsscarrental@yahoo.com",
        //       "contact_person"=> "Ms. Yolly Bella",
        //       "payment_terms"=> "15days"
        //     ],
        //     [
        //       "business_type"=> "IT Solutions",
        //       "supplier_name"=> "Simplelife Technologies Inc,",
        //       "address"=> "-",
        //       "contact_number"=> "+632.631.8888",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Internet and Mobile Provider",
        //       "supplier_name"=> "Smart Billing",
        //       "address"=> "+632.511.4290",
        //       "contact_number"=> "Jerramie Punzalan",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Internet and Mobile Provider",
        //       "supplier_name"=> "Smart CBG (Corporate Business Group)",
        //       "address"=> "-",
        //       "contact_number"=> "Michael Philip Omictin",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Internet and Mobile Provider",
        //       "supplier_name"=> "Smart CBG (Corporate Business Group)",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Internet and Mobile Provider",
        //       "supplier_name"=> "Smart CBG (Corporate Business Group)",
        //       "address"=> "632 893 1510",
        //       "contact_number"=> "John Austria",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Internet and Mobile Provider",
        //       "supplier_name"=> "Smart Mobility Group (Novare Technologies)",
        //       "address"=> "+632 893 1510",
        //       "contact_number"=> "Nikka Dionisio",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Gift Certificates",
        //       "supplier_name"=> "SODEXO PHILIPPINES",
        //       "address"=> "11th Floor B.A. Lepanto Building 8747 Paseo de Roxas Street, Makati City, Philippines",
        //       "contact_number"=> "T=> (632) 8 689-4700",
        //       "email"=> "E=> customercare.svc.ph@sodexo.com",
        //       "contact_person"=> "Shyrica Simeon-Zaldua",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Video & Audio Software",
        //       "supplier_name"=> "Sony VEGAS ( Video & Audio software)",
        //       "address"=> "VEGAS Pro=> Video & audio for professionals",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "SPACIOUS OFFICE EQUIPMENTS AND FURNITURES CORP.",
        //       "address"=> "272 Unit 4-P Crissant Bldg Commonwealth Avenue , Matandang Balara QC",
        //       "contact_number"=> "0995-516-2796",
        //       "email"=> "tonet@buyqube.com",
        //       "contact_person"=> "Antonette Ureta",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "IT Solutions",
        //       "supplier_name"=> "SPECTRAMIND SYSTEMS TECHNOLOGY INC.",
        //       "address"=> "No. 340 Doctor Jose Fernandez Street, Barangay Mauway, Mandaluyong City 1550, Philippines",
        //       "contact_number"=> "T=> 854209867 / 5342506 to 08 / 5429876",
        //       "email"=> "E=> roger.te@gmail.com / sptmsti@gmail.com",
        //       "contact_person"=> "Roger Te",
        //       "payment_terms"=> "50% DP / 50% COMPLETION"
        //     ],
        //     [
        //       "business_type"=> "ESD Shoes and more",
        //       "supplier_name"=> "Speedite Industrial Solutions",
        //       "address"=> "Block 3 Lot 28 Colorado St. Town & Country Southville Brgy. Sto. Tomas Binan Laguna Philippines, 4024",
        //       "contact_number"=> "T=> (049)250-60-33, (049)546-11-15",
        //       "email"=> "E=> sales@speedite-is.com / sales.speedite@gmail.com",
        //       "contact_person"=> "Jackson M. Dieta",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "STANDARD PRINTS",
        //       "address"=> "Block 28 Lot 18 Walnut St. Evergreen County, Brgy. Zapote, Biñan, Laguna",
        //       "contact_number"=> "T=> 049 502 2429 M=> 0967 829 1714 / 0905 672 8412",
        //       "email"=> "standardprints8@gmail.com",
        //       "contact_person"=> "Mark Christian Tuazon",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Airconditioning Services",
        //       "supplier_name"=> "Supercool",
        //       "address"=> "63 2 241 4744",
        //       "contact_number"=> "Abby Alfonso",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "IT Solutions",
        //       "supplier_name"=> "Sycamore Infonet",
        //       "address"=> "-",
        //       "contact_number"=> "T=> 725.2889 / 725.5311",
        //       "email"=> "-",
        //       "contact_person"=> "Newton Sy",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "PLAQUES",
        //       "supplier_name"=> "T.J.'S CLEART ART",
        //       "address"=> "11 B Felicia St. San Antonio Homes, Tandang Sora, Quezon City 1128",
        //       "contact_number"=> "T=> 931 2659 / 453 6295 / 931 8844 / 456 5197 / 951 3912",
        //       "email"=> "tjsclearart89@yahoo.com",
        //       "contact_person"=> "Len Lanon",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Office Furnitures",
        //       "supplier_name"=> "Team Deseret Office Furniture",
        //       "address"=> "+632.576.7687",
        //       "contact_number"=> "Mr. Merille Martin",
        //       "email"=> "-",
        //       "contact_person"=> "+632.576.7687",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "Team Deseret Office Furniture",
        //       "address"=> "+632.239.3511",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Electronic Devices",
        //       "supplier_name"=> "TECHNOTREND COMPUTER SOLUTION CO.\r\n1-A E. Aguinaldo St., West Rembo, Makati City, Philippines 1215",
        //       "address"=> "+632 519 7562",
        //       "contact_number"=> "Emily P. Oropilla",
        //       "email"=> "-",
        //       "contact_person"=> "+632 519 7562",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Health & Safety Supplies",
        //       "supplier_name"=> "Teknica, Incorporated",
        //       "address"=> "508 Tower 2 Lippo Centre 89 Queensway, Hongkong",
        //       "contact_number"=> "T=>",
        //       "email"=> "E=> ",
        //       "contact_person"=> "Romell Galvan",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "THE BELLEVUE MANILA",
        //       "address"=> "5139 North Bridgeway, Filinvest City, Alabang, Muntinlupa City, Philippines 1781",
        //       "contact_number"=> "T=> (+632) 8771 8181",
        //       "email"=> "E=> tbmnl@thebellevue.com",
        //       "contact_person"=> "Ms. Marivic Recio",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Visual and Video Equipments",
        //       "supplier_name"=> "The Brain Computer Corporation",
        //       "address"=> "-",
        //       "contact_number"=> "T=> 722.8843 / 725.5424 / 725.0608",
        //       "email"=> "avservice@brain.com.ph",
        //       "contact_person"=> "Mhae",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Membership and Acceditors (Yearly)",
        //       "supplier_name"=> "The Manila Southwoods Golf & Country Club",
        //       "address"=> "Southwoods Blvd., Carmona, Cavite,\r\n Philippines, 4116",
        //       "contact_number"=> "T=> (046) 419 8190  |  (02) 8779 5590 loc. 131",
        //       "email"=> "E=> jane.vidallo@manilasouthwoods.com",
        //       "contact_person"=> "JANE D. VIDALLO",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Membership and Acceditors (Yearly)",
        //       "supplier_name"=> "The Manila Southwoods Golf & Country Club",
        //       "address"=> "Southwoods Blvd., Carmona, Cavite,\r\n Philippines, 4116",
        //       "contact_number"=> "(046) 419 8190\r\n(02) 8779 5590 loc. 106-108,171",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Membership and Acceditors (Yearly)",
        //       "supplier_name"=> "The Orchard Golf & Country Club",
        //       "address"=> "KM 27 Aguinaldo Highway, Dasmarinas City, Cavite 4114",
        //       "contact_number"=> "T=> 02 9822000 I 046 4165931 to 35 ext. 2511 to 2513",
        //       "email"=> "-",
        //       "contact_person"=> "Rheca Quinto / ",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Accomodations",
        //       "supplier_name"=> "The Paseo Premiere Hotel",
        //       "address"=> "Sta. Rosa Business Park, Greenfield City, Sta Rosa Laguna, Philippines",
        //       "contact_number"=> "T=> (6349) 502-8123 to 27 | (632) 8273-7006 | (632) 8273-7009",
        //       "email"=> "E=> reservations@paseopremierehotel.com",
        //       "contact_person"=> "Kenneth / ",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "IT Solutions",
        //       "supplier_name"=> "Thinking Tools - Cebu",
        //       "address"=> "-",
        //       "contact_number"=> "T=> (32) 345 2227",
        //       "email"=> "-",
        //       "contact_person"=> "Ryan Gastador",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "TIME DEPOT",
        //       "address"=> "Level 2 Space No. 2023 Festival Supermall Corporate Avenue Filinvest City Alabang, Muntinlupa",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "Rona Jacelle Carpio",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Lanyard-ID",
        //       "supplier_name"=> "TINTA PRINTING",
        //       "address"=> "Block 39 Lot 16 Phase 3 Garden Villas 3 Santa Rosa, Laguna",
        //       "contact_number"=> 9178731076,
        //       "email"=> " tinta_printing@yahoo.com",
        //       "contact_person"=> "GERONIMO PABLO JR.",
        //       "payment_terms"=> "60% Downpayment upon confirmation\r\n40% Balance upon completion"
        //     ],
        //     [
        //       "business_type"=> "Utilities",
        //       "supplier_name"=> "Totaldev Multi-Purpose Cooperative",
        //       "address"=> "Unit 2E Jejomar Building #344 Maysilo Circle, Boni Ave, Mandaluyong, Metro Manila\r\nHours=> \r\nCloses soon ⋅ 5PM ⋅ Opens 9AM Wed\r\nPhone=> (02) 8531 9175",
        //       "contact_number"=> "Unit 2E Jejomar Building #344 Maysilo Circle, Boni Ave, Mandaluyong, Metro Manila\r\nHours=> \r\nCloses soon ⋅ 5PM ⋅ Opens 9AM Wed\r\nPhone=> (02) 8531 9175",
        //       "email"=> "Unit 2E Jejomar Building #344 Maysilo Circle, Boni Ave, Mandaluyong, Metro Manila\r\nHours=> \r\nCloses soon ⋅ 5PM ⋅ Opens 9AM Wed\r\nPhone=> (02) 8531 9175",
        //       "contact_person"=> "Unit 2E Jejomar Building #344 Maysilo Circle, Boni Ave, Mandaluyong, Metro Manila\r\nHours=> \r\nCloses soon ⋅ 5PM ⋅ Opens 9AM Wed\r\nPhone=> (02) 8531 9175",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "TOYOTA SANTA ROSA LAGUNA, INC.",
        //       "address"=> "Lot 1968-D Sta. Rosa - Tagaytay Road Brgy. Pulong Sta. Cruz, Sta. Rosa City, laguna",
        //       "contact_number"=> "-",
        //       "email"=> "E=> Kim.bautista@toyotasantarosa.com",
        //       "contact_person"=> "Kim Bautista",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Electronic Services",
        //       "supplier_name"=> "Transerve Technologies Corp",
        //       "address"=> "T=> +63 2. 728.9438 / 757.0858 / 817.4828 / .892.2894",
        //       "contact_number"=> "T=> +63 2. 728.9438 / 757.0858 / 817.4828 / .892.2894",
        //       "email"=> "eprocurement@transerve.com.ph",
        //       "contact_person"=> "Allan",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "IT Solutions",
        //       "supplier_name"=> "Trend Micro (Cyber Security Software Company)",
        //       "address"=> "8/F The Rockwell Business\r\nCenter Tower 2 Ortigas Avenue\r\nPasig City, Metro Manila\r\nPhilippines 1600",
        //       "contact_number"=> "Sales Sup.=> +63 2 8995 6200",
        //       "email"=> "E=> Sales Support=> phsales@trendmicro.com",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "IT Solutions",
        //       "supplier_name"=> "Trends & Technologies, Inc.",
        //       "address"=> "The Penthouse, Trends Plaza Building F. Ramos St.\r\nCebu City 6000 Philippines",
        //       "contact_number"=> "T=> (63) 32 520 8476 local 5318",
        //       "email"=> "E=> jjpatricio@trends.com.ph / ratancinco@trends.com.ph",
        //       "contact_person"=> "Janiel J. Patricio / Rogelio A. Tancinco Jr.",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Copier & Printing Machine Provider",
        //       "supplier_name"=> "UBIX Corp",
        //       "address"=> "632 897 6819 loc 121",
        //       "contact_number"=> "Rose Anne Delumas",
        //       "email"=> "-",
        //       "contact_person"=> "632 890 7510",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Office Furnitures",
        //       "supplier_name"=> "Ultra Modular Concepts",
        //       "address"=> "+63.2.813.8359",
        //       "contact_number"=> "Tina Punzal",
        //       "email"=> "-",
        //       "contact_person"=> "+632.8134510",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Office Furnitures",
        //       "supplier_name"=> "Ultra Modular Concepts",
        //       "address"=> "+63.2.813.5879 loc.",
        //       "contact_number"=> "Monic/ Melanie",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "ULTRATEK ENGINEERING",
        //       "address"=> "-",
        //       "contact_number"=> "t=> 049 536 1660",
        //       "email"=> "ultratek_engg@yahoo.com",
        //       "contact_person"=> "Mhar Angeles",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Airconditioning Services",
        //       "supplier_name"=> "Weathertech Refrigeration & Aircon Co.",
        //       "address"=> "Lot 11 Block 5 Lodora Avenue Lodora Village Tunasan, Muntinlupa City",
        //       "contact_number"=> "T=> (02) 8-8613053; 862-2920; 862-1569",
        //       "email"=> "E=> weathertech.brejente@gmail.com / acctg.weathertech@gmail.com,\r\nksabidalas.weathertech@gmail.com",
        //       "contact_person"=> "Ernani G. Brejente",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Airconditioning Services",
        //       "supplier_name"=> "Weathertech Refrigeration & Aircon Co.",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "E=> servicecoordinator2.weathertech@gmail.com",
        //       "contact_person"=> "Mylyne P. Palma",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Airconditioning Services",
        //       "supplier_name"=> "Weathertech Refrigeration & Aircon Co.",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "E=> vgonzales.weathertech@gmail.com / servicecoordinator2.weathertech@gmail.com,\r\nservice.weathertech@gmail.com",
        //       "contact_person"=> "Vic  Gonzales",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Airconditioning Services",
        //       "supplier_name"=> "Weathertech Refrigeration & Aircon Co.",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "E=> weathertech.finance@gmail.com / acctg.weathertech@gmail.com,\r\nbillingcollection.weathertech@gmail.com",
        //       "contact_person"=> "Vivien Ross Amante",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Contractor (Facilities)",
        //       "supplier_name"=> "Window Installer",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "Lyn",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Office Furnitures",
        //       "supplier_name"=> "Workzone Furnishop Design Systems",
        //       "address"=> "CL 154 2/F Sunset Quay Mall Manila Ocean Park Roxas Blvd.,Brgy. 666 Zone 72 Luneta, Ermita, Manila",
        //       "contact_number"=> "T=> 02-8545-1567/0949-4146973",
        //       "email"=> "E=> sales@workzonefurnishop.com / arleneocab@gmail.com",
        //       "contact_person"=> "JOANNE ",
        //       "payment_terms"=> "COD"
        //     ],
        //     [
        //       "business_type"=> "Video & Audio Conference Solutions",
        //       "supplier_name"=> "Zamony Venture Corporation",
        //       "address"=> "708 Apelo Cruz St., Malibay,  Pasay City 1300",
        //       "contact_number"=> "0966-633-5880",
        //       "email"=> "russel.zamony@gmail.com",
        //       "contact_person"=> "Russel Olimberio ",
        //       "payment_terms"=> "Advance Payment"
        //     ],
        //     [
        //       "business_type"=> "-",
        //       "supplier_name"=> "Zoho Corporation Pte Ltd",
        //       "address"=> "105 Cecil Street, #10-04, The Octagon,\r\nSingapore - 069534",
        //       "contact_number"=> "t=> +65 67231040 (Sales) /\r\n+8001014255",
        //       "email"=> "E=> sales@zohocorp.com",
        //       "contact_person"=> "Anshul Suresh",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Video & Audio Conference Solutions",
        //       "supplier_name"=> "Zoom",
        //       "address"=> "15th Floor KMC Armstrong Corporate Center, HV Dela Costa Street Salcedo Village, Makati City 1227",
        //       "contact_number"=> "N.A.",
        //       "email"=> "N.A.",
        //       "contact_person"=> "N.A.",
        //       "payment_terms"=> "Immediately"
        //     ],
        //     [
        //       "business_type"=> "Watch Supplier",
        //       "supplier_name"=> "Newtrends International Corporation",
        //       "address"=> "Flynn Commercial Building. Unit E-2, 2nd Floor. Gen. Emilio Aguinaldo Hi-Way,. Bacoor City, Cavite, Philippines 4102",
        //       "contact_number"=> "Tel=> +632 8-894-2035 to 40.",
        //       "email"=> "rosalie.zapata@newtrends.ph",
        //       "contact_person"=> "ROSALIE ZAPATA",
        //       "payment_terms"=> "50% Downpayment 50% full payment"
        //     ],
        //     [
        //       "business_type"=> "Aluminum Trading Services",
        //       "supplier_name"=> "RMDS Glass and Aluminum Trading & Services",
        //       "address"=> "Sitio  Bayungan Kaong, Silang Cavite",
        //       "contact_number"=> "0936 9010 150",
        //       "email"=> "-",
        //       "contact_person"=> "Reynan Delos Santos",
        //       "payment_terms"=> "50% Downpayment 50% full payment"
        //     ],
        //     [
        //       "business_type"=> "Training Services",
        //       "supplier_name"=> "GLB Management Consultancy Services",
        //       "address"=> "Blk 40 Lot 2B Reyna Elena Street Greater Lagro 1159 Quezon City NCR Second District Phil",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "Cash"
        //     ],
        //     [
        //       "business_type"=> "Printing Services",
        //       "supplier_name"=> "Press&Prints Printing Services ",
        //       "address"=> "UNIT 4243 The Avenue Residences 555 Tandang Sora Extension Talipapa District 6 Quezon City",
        //       "contact_number"=> "0963 634 8888",
        //       "email"=> "pressandprints.docs@gmail.com",
        //       "contact_person"=> "Rachelle Anne Hermo",
        //       "payment_terms"=> "50 % DP 50% Upon Delivery"
        //     ],
        //     [
        //       "business_type"=> "Plaque Trophies Supplier",
        //       "supplier_name"=> "Prifec Trophies",
        //       "address"=> "Blk24, Lot2, Ph.1, Villa de Calamba\r\nBrgy. La Mesa, Calamba, Laguna",
        //       "contact_number"=> "0906 376 9777",
        //       "email"=> "prifectrophies@gmail.com",
        //       "contact_person"=> "Cirila Reyes",
        //       "payment_terms"=> "50 % DP 50% Upon Delivery"
        //     ],
        //     [
        //       "business_type"=> "Apparel Supplier",
        //       "supplier_name"=> "J&K MDSE., AND FASHION STORE",
        //       "address"=> "Stall No. 16 Sogo Plaza 844-850 liaya St., Brgy. 258 Zone 2, 1010 San Nicolas NCR, City of Manila, First District Philippines",
        //       "contact_number"=> "Jestini Domingo",
        //       "email"=> "justinedomingo34@gmail.com",
        //       "contact_person"=> "Jestini Domingo",
        //       "payment_terms"=> "COD"
        //     ],
        //     [
        //       "business_type"=> "Bulb Supplier",
        //       "supplier_name"=> "Green Chemistry",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Funding",
        //       "supplier_name"=> "Key Actuarial Intelligence, Inc.",
        //       "address"=> "405 F. Ortigas St., New Zaniga, Mandaluyong City 1550",
        //       "contact_number"=> "632-8634-42-44",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Photobooth",
        //       "supplier_name"=> "Y&Y Party Needs Rental",
        //       "address"=> "Block 59 Lot 9 Phase 1 Brgy Caingin Santa Rosa City Laguna",
        //       "contact_number"=> "0949 501 2045",
        //       "email"=> "-",
        //       "contact_person"=> "Arlene Perez Delos Santos",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Catering Service",
        //       "supplier_name"=> "Collado's Catering Services",
        //       "address"=> "Block 3 Lot 36 Phase 3 #8 Mabni St. Pacita Complex 1 San Pedro Laguna",
        //       "contact_number"=> "0917 849 7979",
        //       "email"=> "-",
        //       "contact_person"=> "Glenda Collado",
        //       "payment_terms"=> "ASAP"
        //     ],
        //     [
        //       "business_type"=> "IT Solutions",
        //       "supplier_name"=> "Power Mac Center, Inc. San Pablo",
        //       "address"=> "2nd Flr. Cyberzone, SM City San Pablo Maharlika Highway, Brgy San Rafael, 1, San Pablo City, 4000 Laguna",
        //       "contact_number"=> "(0922)-382-8006",
        //       "email"=> "ronahmae.framil@powermaccenter.com",
        //       "contact_person"=> "Ronah Mae Framil",
        //       "payment_terms"=> "Immediate"
        //     ],
        //     [
        //       "business_type"=> "IT Solutions",
        //       "supplier_name"=> "EVOLVE TECH LIFESTYLE INC.\r\n(Power Mac Center, Vista Mall)",
        //       "address"=> "Unit 132 G/F Vista Mall Sta.Rosa National Hiway Santo Domingo 4026 City of Santa Rosa Laguna Philippines",
        //       "contact_number"=> "0917 812 5532",
        //       "email"=> "jomhel.nido@powermaccenter.com",
        //       "contact_person"=> "Jomhel Nido",
        //       "payment_terms"=> "Immediate"
        //     ],
        //     [
        //       "business_type"=> "Country Club",
        //       "supplier_name"=> "The Palms Country Club, Inc.",
        //       "address"=> "1410 Laguna Heights Dr, Muntinlupa, 1781 Metro Manila",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Club Share",
        //       "supplier_name"=> "G&W Clubshares, Inc.",
        //       "address"=> "Alpap II Building, Trade Ave, Muntinlupa, 1707 Metro Manila",
        //       "contact_number"=> "0995-456-1683",
        //       "email"=> "hailee.zamora@gwgolfshares.ph",
        //       "contact_person"=> "Hailee A. Zamora",
        //       "payment_terms"=> "immediate"
        //     ],
        //     [
        //       "business_type"=> "Online Shopping Philippines",
        //       "supplier_name"=> "Galleon PH",
        //       "address"=> "2302 Sterling Place\r\nPasong Tamo Extension,\r\nMagallanes Makati City,\r\nMetro Manila Philippines",
        //       "contact_number"=> "(02) 8425 0153",
        //       "email"=> "support@galleon.ph",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "Immediate"
        //     ],
        //     [
        //       "business_type"=> "Canva",
        //       "supplier_name"=> "Canva",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "TRaining Services",
        //       "supplier_name"=> "SPARTAN ALLIED SERVICES",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "TRaining Services",
        //       "supplier_name"=> "People Management Association of the Philippines (PMAP)",
        //       "address"=> "-",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Cleaning Supplies",
        //       "supplier_name"=> "ARKIEN HOUSEHOLD PRODUCTS RETAILING (SABON STATION)",
        //       "address"=> "BLK 10 LOT 43 SOUTHVILLE 5, TIMBAO BIÑAN LAGUNA",
        //       "contact_number"=> "+63 928-524-7421/ +63 991-672-2864",
        //       "email"=> "maargentinaumandap@gmail.com",
        //       "contact_person"=> "Ma. Argentina Umandap",
        //       "payment_terms"=> "15 days"
        //     ],
        //     [
        //       "business_type"=> "TRaining Services",
        //       "supplier_name"=> "HONDA PHILIPPINES, INC.",
        //       "address"=> "17km East Service Road, South Superhighway, Brgy. San Martin De Porres, Paranaque City",
        //       "contact_number"=> "-",
        //       "email"=> "jreyes@hondaph.com",
        //       "contact_person"=> "Neil Reyes",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "TRaining Services",
        //       "supplier_name"=> "ARIVA ACADEMY",
        //       "address"=> "ARIVA! BUSINESS CENTER Parañaque City, Philippines",
        //       "contact_number"=> "+632 8832-9901 | +632 8835-9354",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Office Furniture",
        //       "supplier_name"=> "COST U LESS INC.\r",
        //       "address"=> "1159 ESTRADA ST., BRGY 746 ZONE 81 DIST V STA ANA, MANILA",
        //       "contact_number"=> "9176558114",
        //       "email"=> "sales08@costuless.com.ph",
        //       "contact_person"=> "Ms. Mildred L. Urrera ",
        //       "payment_terms"=> "Immediate"
        //     ],
        //     [
        //       "business_type"=> "Sounds Supplier",
        //       "supplier_name"=> "JBL Store",
        //       "address"=> "Office Location2nd floor Topy Building IV Calle Industria cor. Economia St., Bagumbayan, Libis Quezon City",
        //       "contact_number"=> "-",
        //       "email"=> "-",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Camera Supplier",
        //       "supplier_name"=> "Henry's Camera",
        //       "address"=> "3rd Level Activity Center Alabang Town Center, Muntinlupa City",
        //       "contact_number"=> "-",
        //       "email"=> "sales@henryscameraphoto.com",
        //       "contact_person"=> "CSR",
        //       "payment_terms"=> "Immediate"
        //     ],
        //     [
        //       "business_type"=> "Gaming and Multimedia Supplier",
        //       "supplier_name"=> "DATABLITZ",
        //       "address"=> "2275 Leon Guinto St.\r\nMalate, Manila, Philippines 1004",
        //       "contact_number"=> "-",
        //       "email"=> "customercare@datablitz.com.ph",
        //       "contact_person"=> "-",
        //       "payment_terms"=> "-"
        //     ],
        //     [
        //       "business_type"=> "Office & Panty Supplies",
        //       "supplier_name"=> "ROBINSON'S SUPERMARKET CORPORATION",
        //       "address"=> "25/F, Laguna central building, Santa Rosa - Tagaytay Rd, Santa Rosa, 4026 Laguna",
        //       "contact_number"=> "(049) 530 9501",
        //       "email"=> "sw814asms@rsc.com.ph",
        //       "contact_person"=> "Oliver Solano",
        //       "payment_terms"=> "1st to the 15th of the month \r\nPayment Due End of the Month"
        //     ],
        //     [
        //       "business_type"=> "Training Services",
        //       "supplier_name"=> "Philippine Red Cross",
        //       "address"=> "National Headquarters 37 EDSA corner Boni Avenue, Mandaluyong, Metro Manila",
        //       "contact_number"=> "(02) 8790-2365 / (02) 8790-2366",
        //       "email"=> "safetytraining@redcross.org.ph",
        //       "contact_person"=> "Ms. Raine Laminta",
        //       "payment_terms"=> "Immediate"
        //     ]
        // ];


        foreach (array_chunk($vendorList, 200) as $chunk) {
            DB::table('vendors')->insert($chunk);
        }
    }
}
