-- Assuming your PIN is '1234' and you want to hash it
INSERT INTO users (name, email, pin_hash, is_admin) 
VALUES ('AdminTest', 'admin2@test.com', '$2y$10$sImEOKxb47EXW./Ecmn5C.W6ziPIe2WSo/Qk/8ooEEDsSVH40E9ki', TRUE);
