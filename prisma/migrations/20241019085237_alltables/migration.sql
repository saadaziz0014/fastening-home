-- CreateTable
CREATE TABLE "Phocas_Prdcde" (
    "id" SERIAL NOT NULL,
    "P1LIN" TEXT,
    "P1COD" TEXT,
    "P1DSC" TEXT,
    "P1DIV" TEXT,
    "P1LBOV" TEXT,
    "P1CLS" TEXT,
    "P1GRP" TEXT,
    "P1SGRP" TEXT,

    CONSTRAINT "Phocas_Prdcde_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Prdclass" (
    "id" SERIAL NOT NULL,
    "PTCLAS" TEXT,
    "PTDESC" TEXT,

    CONSTRAINT "Phocas_Prdclass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Prdgroup" (
    "id" SERIAL NOT NULL,
    "PTCLAS" TEXT,
    "PTGRP" TEXT,
    "PTDESC" TEXT,

    CONSTRAINT "Phocas_Prdgroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Prdmst" (
    "id" SERIAL NOT NULL,
    "DTLC02" TEXT,
    "PRDLIN" TEXT,
    "PRODNO" TEXT,
    "PRDCDE" TEXT,
    "PRDSCE" TEXT,
    "PRDSCF" TEXT,
    "PRDSSE" TEXT,
    "PRDSSF" TEXT,
    "DIVSN" TEXT,
    "MAKEDS" TEXT,
    "CCDESC" TEXT,
    "CYLDES" TEXT,
    "YRDESC" TEXT,
    "BOREDS" TEXT,
    "SUBPL1" TEXT,
    "SUBPR1" TEXT,
    "SUBPL2" TEXT,
    "SUBPR2" TEXT,
    "SUBPL3" TEXT,
    "SUBPR3" TEXT,
    "REPPLN" TEXT,
    "REPLPR" TEXT,
    "SELUNT" TEXT,
    "PURUNT" TEXT,
    "STKUNT" TEXT,
    "STKCD" TEXT,
    "MFGCD" TEXT,
    "TARIFF" TEXT,
    "DSCFLG" TEXT,
    "FSTPRC" TEXT,
    "FSTCST" TEXT,
    "SEQNO" TEXT,
    "VELCOD" TEXT,
    "PRVVEL" TEXT,
    "FSTCNV" TEXT,
    "POCNV" TEXT,
    "PRLST" TEXT,
    "VENDNO" TEXT,
    "ALTVN1" TEXT,
    "ALTVN2" TEXT,
    "ALTVN3" TEXT,
    "WEIGHT" TEXT,
    "DTEPRC" TEXT,
    "LNDCPR" TEXT,
    "JOBNET" TEXT,
    "TRADPR" TEXT,
    "LISTPR" TEXT,
    "QBRKCD" TEXT,
    "VEVCST" TEXT,
    "LCSTDT" TEXT,
    "PLDCST" TEXT,
    "PCSTDT" TEXT,
    "NRTFLG" TEXT,
    "FSTCD" TEXT,
    "VALSTS" TEXT,
    "PRCFLG" TEXT,
    "CORPLN" TEXT,
    "CORPRD" TEXT,
    "BIRTH" TEXT,
    "USRID" TEXT,
    "MNTDTE" TEXT,
    "CORCST" TEXT,
    "GSTCD" TEXT,
    "PMHPLN" TEXT,
    "PMFTC1" TEXT,
    "PMFTF1" TEXT,
    "PMFTC2" TEXT,
    "PMFTF2" TEXT,
    "PMFTC3" TEXT,
    "PMFTF3" TEXT,
    "PMCLAS" TEXT,
    "PMGRP" TEXT,
    "PMSGRP" TEXT,
    "PMUCC" TEXT,
    "PCVDSC" TEXT,
    "PMSPK" TEXT,
    "DGRCOD" TEXT,
    "PMINDC" TEXT,
    "PMMNFC" TEXT,
    "PMUCCN" TEXT,
    "DEVCEN" TEXT,
    "PRCCEN" TEXT,
    "LCSCEN" TEXT,
    "PCSCEN" TEXT,
    "BIRCEN" TEXT,
    "MNTCEN" TEXT,
    "PMINVC" TEXT,
    "PMVMIC" TEXT,
    "PMCDE2" TEXT,
    "PMUPC" TEXT,
    "PMSFLN" TEXT,
    "PMSFPR" TEXT,
    "PMGPLN" TEXT,
    "PMGPPR" TEXT,
    "PMTYPE" TEXT,
    "PMHARM" TEXT,
    "PMCTRY" TEXT,
    "PMPSTC" TEXT,
    "PMBUYR" TEXT,
    "PMLENG" TEXT,
    "PMWIDT" TEXT,
    "PMHEIG" TEXT,
    "PCHGTM" TEXT,
    "PMCATG" TEXT,
    "PMSCTG" TEXT,
    "IMGAVL" TEXT,
    "SPCAVL" TEXT,
    "WEBUSE" TEXT,
    "PMOCST" TEXT,
    "PMOOFG" TEXT,
    "PMLCST" TEXT,
    "PMOLFG" TEXT,
    "PMCSA" TEXT,
    "PMUNCR" TEXT,
    "PMDRAW" TEXT,
    "PMREF1" TEXT,
    "PMREF2" TEXT,
    "PMINYN" TEXT,
    "PMOCGL" TEXT,
    "PMLCGL" TEXT,
    "PMWEIG" TEXT,
    "PMCVOL" TEXT,
    "PMQCAR" TEXT,
    "PMCORE" TEXT,
    "PMCONV" TEXT,
    "PMSMLT" TEXT,
    "PMPMLT" TEXT,
    "PMPPR" TEXT,
    "PMEHCC" TEXT,
    "PMVNRT" TEXT,
    "PMCARQ" TEXT,
    "PMPRC1" TEXT,
    "PMPRC2" TEXT,
    "PMPRC3" TEXT,
    "PMSCT2" TEXT,
    "PMRESF" TEXT,
    "PMCAMP" TEXT,
    "PMSCT3" TEXT,
    "PMSCT4" TEXT,
    "PMSCT5" TEXT,
    "DELDTE" TEXT,
    "ALTDSP" TEXT,
    "PMECF1" TEXT,
    "PMECF2" TEXT,
    "CSTCFG" TEXT,

    CONSTRAINT "Phocas_Prdmst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Split_Ordhst_2025_FHI" (
    "id" SERIAL NOT NULL,
    "ORDNO" TEXT,
    "DEOPER" TEXT,
    "WSID" TEXT,
    "BRANC" TEXT,
    "CUSTNO" TEXT,
    "CBILNO" TEXT,
    "CPAYNO" TEXT,
    "CNAME" TEXT,
    "CADD1" TEXT,
    "CADD2" TEXT,
    "CADD3" TEXT,
    "CPCODE" TEXT,
    "SHNAME" TEXT,
    "SHADD1" TEXT,
    "SHADD2" TEXT,
    "SHADD3" TEXT,
    "SHPOST" TEXT,
    "PRVCD" TEXT,
    "AREACD" TEXT,
    "PHONE1" TEXT,
    "PHONE2" TEXT,
    "FSTLIC" TEXT,
    "PSTLIC" TEXT,
    "TRMCDE" TEXT,
    "TERMDS" TEXT,
    "FSTAMT" TEXT,
    "PSTCD" TEXT,
    "PSTPCT" TEXT,
    "PSTAMT" TEXT,
    "SHPCHG" TEXT,
    "TOTAMT" TEXT,
    "CUSPON" TEXT,
    "REFNO" TEXT,
    "SPINST" TEXT,
    "CODSTS" TEXT,
    "HLDSTS" TEXT,
    "ODUSTS" TEXT,
    "CASHPD" TEXT,
    "INVNOW" TEXT,
    "SHPVIA" TEXT,
    "WAYBIL" TEXT,
    "POREQ" TEXT,
    "BOALOW" TEXT,
    "SLSNO" TEXT,
    "SNAME" TEXT,
    "ORTDAT" TEXT,
    "ORTTIM" TEXT,
    "ORPDAT" TEXT,
    "ORPTIM" TEXT,
    "ORRDAT" TEXT,
    "ORRTIM" TEXT,
    "ORSDAT" TEXT,
    "ORSTIM" TEXT,
    "ORADAT" TEXT,
    "ORATIM" TEXT,
    "ORCDAT" TEXT,
    "ORCTIM" TEXT,
    "ORIDAT" TEXT,
    "ORITIM" TEXT,
    "INVNO" TEXT,
    "CUSTYP" TEXT,
    "SUPCUS" TEXT,
    "ORDDIS" TEXT,
    "ORDPCT" TEXT,
    "PRJTNO" TEXT,
    "ORDTYP" TEXT,
    "ORGOR" TEXT,
    "CRDNTE" TEXT,
    "SPL" TEXT,
    "SPLDAY" TEXT,
    "INV02" TEXT,
    "INV03" TEXT,
    "INV04" TEXT,
    "INV05" TEXT,
    "INV06" TEXT,
    "INV07" TEXT,
    "INV08" TEXT,
    "INV09" TEXT,
    "INV10" TEXT,
    "INV11" TEXT,
    "INV12" TEXT,
    "SALYR" TEXT,
    "SALPE" TEXT,
    "ORBDAT" TEXT,
    "ORTYPE" TEXT,
    "ORDSCD" TEXT,
    "OGSTNO" TEXT,
    "OGSTAM" TEXT,
    "OSJGST" TEXT,
    "ORHSTS" TEXT,
    "ORDVAL" TEXT,
    "ORPOST" TEXT,
    "REASON" TEXT,
    "CHRDAT" TEXT,
    "CHRTIM" TEXT,
    "CHRAUT" TEXT,
    "OREF" TEXT,
    "ORDDUE" TEXT,
    "SHPBFR" TEXT,
    "SHPSTS" TEXT,
    "HDLCHG" TEXT,
    "OPREPY" TEXT,
    "OSDPO" TEXT,
    "ORJENO" TEXT,
    "OCNPER" TEXT,
    "OSHPDT" TEXT,
    "CZPCDE" TEXT,
    "SHZPCD" TEXT,
    "OHCTYP" TEXT,
    "OHCRD" TEXT,
    "OHCEXP" TEXT,
    "OHAPRO" TEXT,
    "ORTCEN" TEXT,
    "ORPCEN" TEXT,
    "ORRCEN" TEXT,
    "ORSCEN" TEXT,
    "ORACEN" TEXT,
    "ORCCEN" TEXT,
    "ORICE" TEXT,
    "SALCE" TEXT,
    "ORBCEN" TEXT,
    "CHRCEN" TEXT,
    "ODUCEN" TEXT,
    "OSHCEN" TEXT,
    "OEXCEN" TEXT,
    "RTKPCT" TEXT,
    "FRTPCT" TEXT,
    "OHARTP" TEXT,
    "OHCURR" TEXT,
    "OHEXRT" TEXT,
    "OHOEXR" TEXT,
    "OTELNO" TEXT,
    "OLOTPR" TEXT,
    "OPRCPS" TEXT,
    "OACTCD" TEXT,
    "OPKCEN" TEXT,
    "OPKDAT" TEXT,
    "OPKTIM" TEXT,
    "OPICEN" TEXT,
    "OPICPD" TEXT,
    "OPKSEQ" TEXT,
    "OSPCEN" TEXT,
    "OSPDAT" TEXT,
    "OSPTIM" TEXT,
    "OCNUSR" TEXT,
    "OELTOR" TEXT,
    "OLKUSR" TEXT,
    "OFUTUR" TEXT,
    "OCITY" TEXT,
    "OPRVCD" TEXT,
    "OCNTY" TEXT,
    "OEXPDT" TEXT,
    "OEPCEN" TEXT,
    "OHBPOR" TEXT,
    "OQBRDT" TEXT,
    "OQBRCN" TEXT,
    "OHDEP" TEXT,
    "OHDAP" TEXT,
    "OHOGD" TEXT,
    "OHPORD" TEXT,
    "OHDOP" TEXT,
    "OHRBRN" TEXT,
    "OHRORD" TEXT,
    "OHRIDT" TEXT,
    "OHRICN" TEXT,
    "OHIPRT" TEXT,
    "OHSIV" TEXT,
    "OHSIDT" TEXT,
    "OHSICN" TEXT,
    "TOTEHC" TEXT,
    "TOTCOR" TEXT,
    "CIDENT" TEXT,
    "CIDSLS" TEXT,
    "OHOVRF" TEXT,
    "OIVUSR" TEXT,
    "OHRPRS" TEXT,
    "OHBCEN" TEXT,
    "OHBDAT" TEXT,
    "OHBUSR" TEXT,
    "OHBDFG" TEXT,
    "OHDSCD" TEXT,
    "OHPURD" TEXT,
    "OHPCKD" TEXT,
    "BRANCH" TEXT,
    "LINENO" TEXT,
    "STK" TEXT,
    "NRTFLG" TEXT,
    "PRODNO" TEXT,
    "PRDREF" TEXT,
    "PRDLIN" TEXT,
    "DESC" TEXT,
    "QTY" TEXT,
    "QS" TEXT,
    "QR" TEXT,
    "PU" TEXT,
    "BO" TEXT,
    "LS" TEXT,
    "CNSFLG" TEXT,
    "SHIPBR" TEXT,
    "NET" TEXT,
    "UNET" TEXT,
    "DISC" TEXT,
    "COST" TEXT,
    "CANCEL" TEXT,
    "ALTSUB" TEXT,
    "LINCHG" TEXT,
    "LINDAT" TEXT,
    "OPRCHG" TEXT,
    "ORGNET" TEXT,
    "ORGDIS" TEXT,
    "PRDTXT" TEXT,
    "OREXFG" TEXT,
    "PONO" TEXT,
    "PRCSRC" TEXT,
    "FSTRAM" TEXT,
    "TFRBRH" TEXT,
    "ORGORD" TEXT,
    "BPRCDE" TEXT,
    "LOCATN" TEXT,
    "ORIYMD" TEXT,
    "SALCEN" TEXT,
    "OBKCEN" TEXT,
    "DRESON" TEXT,
    "DPSTCD" TEXT,
    "DPRTFG" TEXT,
    "DREQON" TEXT,
    "DRQCEN" TEXT,
    "DREQDT" TEXT,
    "DOVCEN" TEXT,
    "DOVETA" TEXT,
    "DPRDPZ" TEXT,
    "DPICSQ" TEXT,
    "DPICPG" TEXT,
    "DPICLN" TEXT,
    "DFUTUR" TEXT,
    "DRAVNQ" TEXT,
    "DRAVND" TEXT,
    "DRACUQ" TEXT,
    "DRANO" TEXT,
    "BYORLN" TEXT,
    "BYLCLN" TEXT,
    "DSTDFG" TEXT,
    "EHCUNT" TEXT,
    "EHCEXT" TEXT,
    "CORFLG" TEXT,
    "CORUNT" TEXT,
    "COREXT" TEXT,
    "ODLSPR" TEXT,
    "REFINV" TEXT,
    "REFOLN" TEXT,
    "ODPUQ" TEXT,
    "ODSCID" TEXT,
    "REFOD" TEXT,
    "REFOU" TEXT,
    "OREFAM" TEXT,
    "ODLINC" TEXT,
    "ORPKU" TEXT,
    "ORDSGR" TEXT,
    "ODSSTD" TEXT,
    "ORGDIR" TEXT,
    "ODIRAC" TEXT,
    "ODSRTN" TEXT,
    "SALST" TEXT,
    "SALNR" TEXT,
    "SHSHTP" TEXT,
    "SHSTHR" TEXT,
    "OTSUP" TEXT,
    "DPPHRS" TEXT,
    "ODTDSP" TEXT,
    "RMPER" TEXT,
    "OENH" TEXT,
    "UDF1" TEXT,
    "UDF2" TEXT,
    "UDF3" TEXT,
    "UDF4" TEXT,
    "UDF5" TEXT,

    CONSTRAINT "Phocas_Split_Ordhst_2025_FHI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Split_Ordhst_2025_Sabre" (
    "id" SERIAL NOT NULL,
    "orderNumber" TEXT,
    "orderType" TEXT,
    "dateCreated" TEXT,
    "dateUpdated" TEXT,
    "pmAcr" TEXT,
    "pmAr" TEXT,
    "pmBs" TEXT,
    "pmCf" TEXT,
    "pmCh" TEXT,
    "pmChG" TEXT,
    "pmChL" TEXT,
    "pmCu" TEXT,
    "pmFbr" TEXT,
    "pmFcr" TEXT,
    "pmGdr" TEXT,
    "pmGn" TEXT,
    "pmInv" TEXT,
    "pmLnr" TEXT,
    "pmLrr" TEXT,
    "pmLwr" TEXT,
    "pmMkt" TEXT,
    "pmNr" TEXT,
    "pmOr" TEXT,
    "pmOrD" TEXT,
    "pmOrP" TEXT,
    "pmPdr" TEXT,
    "pmPl" TEXT,
    "pmPo" TEXT,
    "pmPoN" TEXT,
    "pmPoA" TEXT,
    "pmPsd" TEXT,
    "pmRtl" TEXT,
    "pmRtw" TEXT,
    "pmSeD" TEXT,
    "pmSeF" TEXT,
    "pmSeI" TEXT,
    "pmSeN" TEXT,
    "pmSeP" TEXT,
    "pmSeS" TEXT,
    "pmSeT" TEXT,
    "pmSeW" TEXT,
    "pmSfs" TEXT,
    "pmSps" TEXT,
    "pmSt" TEXT,
    "pmStD" TEXT,
    "pmStN" TEXT,
    "pmStS" TEXT,
    "pmTxD" TEXT,
    "pmTxF" TEXT,
    "pmTxG" TEXT,
    "pmTxN" TEXT,
    "pmUq" TEXT,
    "pmWa" TEXT,
    "pmWaL" TEXT,
    "pmWd" TEXT,
    "pmXr" TEXT,
    "pmYe" TEXT,
    "pmEz" TEXT,
    "pmEb" TEXT,
    "pmEbr" TEXT,
    "pmEbrC" TEXT,
    "pmDbr" TEXT,
    "pmDt" TEXT,
    "pmDtTr" TEXT,
    "pmTrdD" TEXT,
    "pmTrdP" TEXT,
    "pmTrdN" TEXT,
    "pmAcM" TEXT,
    "pmAcD" TEXT,
    "pmCdUq" TEXT,
    "pmDlG" TEXT,
    "pmDlG2" TEXT,
    "pmDlL" TEXT,
    "pmRcAl" TEXT,
    "pmRvl" TEXT,
    "pmSizP" TEXT,
    "pmSpt" TEXT,
    "pmGnOn" TEXT,
    "pmSpg" TEXT,
    "pmSpSt" TEXT,
    "pmUoM" TEXT,
    "pmUoM2" TEXT,
    "pmUoM3" TEXT,
    "pmUoM4" TEXT,
    "pmUoM5" TEXT,
    "pmUoM6" TEXT,
    "pmUoM7" TEXT,
    "pmUoM8" TEXT,
    "pmUoM9" TEXT,
    "pmUoM10" TEXT,
    "pmUoM11" TEXT,
    "pmUoM12" TEXT,
    "pmUoM13" TEXT,
    "pmUoM14" TEXT,
    "pmUoM15" TEXT,
    "pmUoM16" TEXT,
    "pmUoM17" TEXT,
    "pmUoM18" TEXT,
    "pmUoM19" TEXT,
    "pmUoM20" TEXT,
    "pmUoM21" TEXT,
    "pmUoM22" TEXT,
    "pmUoM23" TEXT,
    "pmUoM24" TEXT,
    "pmUoM25" TEXT,
    "pmUoM26" TEXT,
    "pmUoM27" TEXT,
    "pmUoM28" TEXT,
    "pmUoM29" TEXT,
    "pmUoM30" TEXT,
    "pmUoM31" TEXT,
    "pmUoM32" TEXT,
    "pmUoM33" TEXT,
    "pmUoM34" TEXT,
    "pmUoM35" TEXT,
    "pmUoM36" TEXT,
    "pmUoM37" TEXT,
    "pmUoM38" TEXT,
    "pmUoM39" TEXT,
    "pmUoM40" TEXT,
    "pmUoM41" TEXT,
    "pmUoM42" TEXT,
    "pmUoM43" TEXT,
    "pmUoM44" TEXT,
    "pmUoM45" TEXT,
    "pmUoM46" TEXT,
    "pmUoM47" TEXT,
    "pmUoM48" TEXT,
    "pmUoM49" TEXT,
    "pmUoM50" TEXT,
    "pmUoM51" TEXT,
    "pmUoM52" TEXT,
    "pmUoM53" TEXT,
    "pmUoM54" TEXT,
    "pmUoM55" TEXT,
    "pmUoM56" TEXT,
    "pmUoM57" TEXT,
    "pmUoM58" TEXT,
    "pmUoM59" TEXT,
    "pmUoM60" TEXT,
    "pmUoM61" TEXT,
    "pmUoM62" TEXT,
    "pmUoM63" TEXT,
    "pmUoM64" TEXT,
    "pmUoM65" TEXT,
    "pmUoM66" TEXT,
    "pmUoM67" TEXT,
    "pmUoM68" TEXT,
    "pmUoM69" TEXT,
    "pmUoM70" TEXT,
    "pmUoM71" TEXT,
    "pmUoM72" TEXT,
    "pmUoM73" TEXT,
    "pmUoM74" TEXT,
    "pmUoM75" TEXT,
    "pmUoM76" TEXT,
    "pmUoM77" TEXT,
    "pmUoM78" TEXT,
    "pmUoM79" TEXT,
    "pmUoM80" TEXT,
    "pmUoM81" TEXT,
    "pmUoM82" TEXT,
    "pmUoM83" TEXT,
    "pmUoM84" TEXT,
    "pmUoM85" TEXT,
    "pmUoM86" TEXT,
    "pmUoM87" TEXT,
    "pmUoM88" TEXT,
    "pmUoM89" TEXT,
    "pmUoM90" TEXT,
    "pmUoM91" TEXT,
    "pmUoM92" TEXT,
    "pmUoM93" TEXT,
    "pmUoM94" TEXT,
    "pmUoM95" TEXT,
    "pmUoM96" TEXT,
    "pmUoM97" TEXT,
    "pmUoM98" TEXT,
    "pmUoM99" TEXT,

    CONSTRAINT "Phocas_Split_Ordhst_2025_Sabre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Venlin" (
    "id" SERIAL NOT NULL,
    "prdlin" TEXT,
    "linsce" TEXT,
    "vendor" TEXT,
    "vname" TEXT,

    CONSTRAINT "Phocas_Venlin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Whsprd" (
    "id" SERIAL NOT NULL,
    "dtlc01" TEXT,
    "whscod" TEXT,
    "prodno" TEXT,
    "prdlin" TEXT,
    "velcod" TEXT,
    "prvvel" TEXT,
    "stkcd" TEXT,
    "revflg" TEXT,
    "cnvprd" TEXT,
    "poconp" TEXT,
    "qtyohd" TEXT,
    "qtytrn" TEXT,
    "qtycom" TEXT,
    "qtybck" TEXT,
    "qtylst" TEXT,
    "mnsqty" TEXT,
    "mxsqty" TEXT,
    "mnaqty" TEXT,
    "curcst" TEXT,
    "lstprp" TEXT,
    "datfst" TEXT,
    "datlsl" TEXT,
    "datlrv" TEXT,
    "trend" TEXT,
    "foecast" TEXT,
    "safstk" TEXT,
    "avgcst" TEXT,
    "prvcst" TEXT,
    "locatn" TEXT,
    "qualcd" TEXT,
    "cnsflg" TEXT,
    "ytdxsd" TEXT,
    "lyxsd" TEXT,
    "leadtm" TEXT,
    "cvrage" TEXT,
    "ledflg" TEXT,
    "seqno" TEXT,
    "datlph" TEXT,
    "datlvl" TEXT,
    "salavg" TEXT,
    "wqtyhd" TEXT,
    "wlsrcd" TEXT,
    "wostk" TEXT,
    "wbo" TEXT,
    "wboytd" TEXT,
    "wpoiytd" TEXT,
    "wsytd" TEXT,
    "wqtyra" TEXT,
    "pmhpln" TEXT,
    "wibtfr" TEXT,
    "wibtto" TEXT,
    "wonord" TEXT,
    "eoq" TEXT,
    "fstcen" TEXT,
    "lslcen" TEXT,
    "lrvcen" TEXT,
    "lphcen" TEXT,
    "lvlcen" TEXT,
    "lrdcen" TEXT,
    "wminvc" TEXT,
    "wminvf" TEXT,
    "wmvmic" TEXT,
    "wmvif" TEXT,
    "wmbuyr" TEXT,
    "wmbooo" TEXT,
    "wmibtb" TEXT,
    "wmiboo" TEXT,
    "wmibbt" TEXT,
    "wqcomd" TEXT,
    "wqohdd" TEXT,
    "wmfutq" TEXT,
    "cvrflg" TEXT,
    "mnsflg" TEXT,
    "mxsqflg" TEXT,
    "wmcyc" TEXT,
    "cycflg" TEXT,
    "eoqflg" TEXT,
    "wmavgq" TEXT,
    "wmloc2" TEXT,
    "wmrqty" TEXT,
    "wmrqcm" TEXT,
    "wmrqbo" TEXT,
    "wmoibq" TEXT,
    "wmoibb" TEXT,
    "wmoibt" TEXT,
    "wmotqa" TEXT,
    "wmotqb" TEXT,
    "wmotqf" TEXT,
    "wmvraq" TEXT,
    "wmvrad" TEXT,
    "wmdavg" TEXT,
    "wmwmin" TEXT,
    "wmwmax" TEXT,
    "wmwdat" TEXT,
    "wmwcen" TEXT,
    "wmwusr" TEXT,
    "extendedoh" TEXT,
    "extendcore" TEXT,
    "lndcpr" TEXT,
    "qbrkcd" TEXT,
    "corcst" TEXT,
    "pmcore" TEXT,
    "skurfc" TEXT,

    CONSTRAINT "Phocas_Whsprd_pkey" PRIMARY KEY ("id")
);
