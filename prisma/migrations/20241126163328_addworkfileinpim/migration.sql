-- CreateTable
CREATE TABLE "Phocas_Prdln" (
    "id" VARCHAR NOT NULL,
    "LINSCE" VARCHAR,
    "PRDLIN" VARCHAR,
    "VENDOR" VARCHAR,

    CONSTRAINT "Phocas_Prdln_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Prdmst" (
    "id" VARCHAR NOT NULL,
    "PRDLIN" VARCHAR,
    "PRODNO" VARCHAR,
    "PRDSCE" VARCHAR,
    "SELUNT" VARCHAR,
    "PURUNT" VARCHAR,
    "STKUNT" VARCHAR,
    "TARIFF" VARCHAR,
    "VELCOD" VARCHAR,
    "QBRKCD" VARCHAR,
    "PRCFLG" VARCHAR,
    "PMINVC" VARCHAR,
    "PMCDE2" VARCHAR,
    "PMPPER" VARCHAR,
    "PRDCDE" VARCHAR,
    "SEQNO" VARCHAR,
    "VENDNO" VARCHAR,
    "DTEPRC" VARCHAR,
    "LNDCPR" VARCHAR,
    "JOBNET" VARCHAR,
    "TRADPR" VARCHAR,
    "LISTPR" VARCHAR,
    "VEVCST" VARCHAR,
    "MNTDTE" VARCHAR,
    "PMCLAS" VARCHAR,
    "PMGRP" VARCHAR,
    "PMSGRP" VARCHAR,
    "PMUPC" VARCHAR,
    "PMQCAR" VARCHAR,
    "PMCONV" VARCHAR,
    "PMSMLT" VARCHAR,
    "PMPMLT" VARCHAR,
    "PMPRC1" VARCHAR,
    "PMPRC2" VARCHAR,

    CONSTRAINT "Phocas_Prdmst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Split_Ordhst_2025_FHI" (
    "id" VARCHAR NOT NULL,
    "DEOPER" VARCHAR,
    "CNAME" VARCHAR,
    "CUSPON" VARCHAR,
    "SNAME" VARCHAR,
    "PRODNO" VARCHAR,
    "PRDLIN" VARCHAR,
    "DESC" VARCHAR,
    "OPRCHG" VARCHAR,
    "PRCSRC" VARCHAR,
    "DFSTCD" VARCHAR,
    "DISCOD" VARCHAR,
    "DPRDGP" VARCHAR,
    "DUCOST" VARCHAR,
    "PMINVC" VARCHAR,
    "SLSMN#" VARCHAR,
    "VELCOD" VARCHAR,
    "ORDNO" VARCHAR,
    "CUSTNO" VARCHAR,
    "SLSNO" VARCHAR,
    "ORIDAT" VARCHAR,
    "INVNO" VARCHAR,
    "BRANCH" VARCHAR,
    "QS" VARCHAR,
    "NET" VARCHAR,
    "UNET" VARCHAR,
    "DISC" VARCHAR,
    "COST" VARCHAR,
    "ORGNET" VARCHAR,
    "ORGDIS" VARCHAR,

    CONSTRAINT "Phocas_Split_Ordhst_2025_FHI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Whsprd" (
    "id" VARCHAR NOT NULL,
    "AVGCST" VARCHAR,
    "DATLSL" VARCHAR,
    "LISTPR" VARCHAR,
    "LNDCPR" VARCHAR,
    "LOCATN" VARCHAR,
    "MNSQTY" VARCHAR,
    "MXSQTY" VARCHAR,
    "PMCLAS" VARCHAR,
    "PMINVC" VARCHAR,
    "PRDCDE" VARCHAR,
    "PRDLIN" VARCHAR,
    "PRDSCE" VARCHAR,
    "PRODNO" VARCHAR,
    "QBRKCD" VARCHAR,
    "QTYCOM" VARCHAR,
    "QTYOHD" VARCHAR,
    "SUBPR1" VARCHAR,
    "SUBPR2" VARCHAR,
    "SUBPR3" VARCHAR,
    "TARIFF" VARCHAR,
    "VELCOD" VARCHAR,
    "VENDNO" VARCHAR,
    "WHSCOD" VARCHAR,
    "WMINVC" VARCHAR,
    "WMLOC2" VARCHAR,
    "WMLOC3" VARCHAR,
    "WMLOC4" VARCHAR,
    "WONORD" VARCHAR,

    CONSTRAINT "Phocas_Whsprd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Venlin" (
    "id" VARCHAR NOT NULL,
    "VDTYPE" VARCHAR,
    "VENDOR" VARCHAR,
    "VMTARF" VARCHAR,
    "VNAME" VARCHAR,

    CONSTRAINT "Phocas_Venlin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "Group" VARCHAR,
    "Description" VARCHAR,
    "id" VARCHAR NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Prdcde" (
    "id" VARCHAR NOT NULL,
    "P1LIN" VARCHAR,
    "P1DSC" VARCHAR,
    "P1COD" VARCHAR,

    CONSTRAINT "Phocas_Prdcde_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Prdcls" (
    "PTCLAS" VARCHAR NOT NULL,
    "PTDESC" VARCHAR,
    "id" VARCHAR,

    CONSTRAINT "Phocas_Prdcls_pkey" PRIMARY KEY ("PTCLAS")
);

-- CreateTable
CREATE TABLE "PriceTracker" (
    "id" VARCHAR NOT NULL,
    "prdline" VARCHAR,
    "vendor" VARCHAR,
    "status" VARCHAR,
    "effectivedate" VARCHAR,
    "promofile" VARCHAR,
    "quotefile" VARCHAR,
    "deadstock" VARCHAR,
    "prlinevsvendor" VARCHAR,
    "customervalueprice" VARCHAR,
    "vendornumber" VARCHAR,
    "specialvendor" VARCHAR,
    "punchcomparison" VARCHAR,
    "freight" VARCHAR,
    "searchkey" VARCHAR,
    "pricelistform" VARCHAR,
    "sabreinfo" VARCHAR,
    "notes" VARCHAR,

    CONSTRAINT "PriceTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phocas_Split_Ordhst_2025_SABRE" (
    "id" VARCHAR NOT NULL,
    "CUSTNO" VARCHAR,
    "CNAME" VARCHAR,
    "BRANCH" VARCHAR,
    "SLSMN#" VARCHAR,
    "SNAME" VARCHAR,
    "ORDNO" VARCHAR,
    "INVNO" VARCHAR,
    "ORIDAT" VARCHAR,
    "PRDLIN" VARCHAR,
    "PRODNO" VARCHAR,
    "DESC" VARCHAR,
    "QS" VARCHAR,
    "DUCOST" VARCHAR,
    "ORGNET" VARCHAR,
    "ORGDIS" VARCHAR,
    "UNET" VARCHAR,
    "DISC" VARCHAR,
    "PRCSRC" VARCHAR,
    "COST" VARCHAR,
    "NET" VARCHAR,
    "DEOPER" VARCHAR,
    "OPRCHG" VARCHAR,
    "DISCOD" VARCHAR,
    "SLSNO" VARCHAR,
    "DFSTCD" VARCHAR,
    "DPRDGP" VARCHAR,
    "VELCOD" VARCHAR,
    "PMINVC" VARCHAR,
    "CUSPON" VARCHAR,

    CONSTRAINT "Phocas_Split_Ordhst_2025_SABRE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkFile" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB,
    "name" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkFile_pkey" PRIMARY KEY ("id")
);
