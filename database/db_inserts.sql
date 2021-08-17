INSERT INTO products (product_name,product_description,product_price,product_disponibilty) VALUES
('Hamburguesa Simple','Hamburguesa con tomate, lechuga y papas fritas',500,1),
('Hamburguesa Completa','Hamburguesa con tomate, lechuga, huevo y papas fritas',700,1),
('Milanesa Completa','Milanesa con tomate, lechuga, huevo y papas fritas',600,1);

INSERT INTO payment_methods (payment_description) VALUES
('Efectivo'),
('Tarjeta de Crédito'),
('Tarjeta de Débito');

INSERT INTO order_status (order_status_description) VALUES
('Pendiente'),
('Cancelado'),
('Confirmado'),
('En Preparación'),
('En Camino'),
('Entregado');

INSERT INTO users (email,fullname,phone,adress,user_password,user_admin) VALUES
('usuario_admin@gmail.com','usuario administrador','1234-1234','Direccion Delilah Resto','adminPass',1),
('usuario1@hotmail.com','usuario uno','4321-4321','Direccion Usuario 1','usuario1Pass',0);



