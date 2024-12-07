IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'barcode_db')
BEGIN
    CREATE DATABASE barcode_db;
END
GO

USE barcode_db;
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Persons]') AND type in (N'U'))
BEGIN
    CREATE TABLE Persons (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        Age INT NOT NULL,
        Dob DATE NOT NULL,
        Sex NVARCHAR(10) NOT NULL,
        BarcodeData NVARCHAR(255) NOT NULL UNIQUE,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE()
    );

    -- Add indexes for better performance
    CREATE INDEX IX_Persons_Name ON Persons(Name);
    CREATE UNIQUE INDEX IX_Persons_BarcodeData ON Persons(BarcodeData);
END 