ALTER TABLE athletes 
ADD COLUMN identifier VARCHAR(20) UNIQUE NOT NULL,
ADD COLUMN created DATE,
ADD COLUMN modified DATE,
ADD COLUMN nationality VARCHAR(100);