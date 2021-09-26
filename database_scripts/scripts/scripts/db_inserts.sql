INSERT INTO products (product_name,product_description,product_price,product_disponibilty) VALUES
('Hamburguesa Simple','Hamburguesa con tomate, lechuga y papas fritas',500,1),
('Hamburguesa Completa','Hamburguesa con tomate, lechuga, huevo y papas fritas',700,1),
('Milanesa Completa','Milanesa con tomate, lechuga, huevo y papas fritas',600,1);

INSERT INTO payment_methods (payment_description) VALUES
('Pendiente'),
('Efectivo'),
('Tarjeta');

INSERT INTO order_status (order_status_description) VALUES
('Pendiente'),
('Cancelado'),
('Confirmado'),
('En Preparación'),
('En Camino'),
('Entregado');
