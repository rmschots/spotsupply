INSERT INTO `beach`
(id, name, created, updated, coordinates)
VALUES
  (1, 'OSTEND', NOW(), NOW(),
   '2.9216015,51.2342932;2.9235005,51.2346693;2.9222453,51.2364293;2.9201317,51.2376519;2.9192519,51.2374705;2.9194021,51.2373966;2.918855,51.2369466;2.9158831,51.2359054;2.9140377,51.2351866;2.9097354,51.2327884;2.9062486,51.2301616;2.9044676,51.2291807;2.8977942,51.2263857;2.8991246,51.2250554;2.9000473,51.2250957;2.9073,51.2286029;2.9113126,51.2306587;2.9127502,51.2325264;2.9181361,51.2351866;2.9216015,51.2342932'),
  (2, 'OTHER_BEACH', NOW(), NOW(),
   '2.6262903,51.1193103;2.6271486,51.1179095;2.6403236,51.1230276;2.6389933,51.1242262;2.6262903,51.1193103');

INSERT INTO `user`
(id, email, phone_number, password_hash, created, updated, verified)
VALUES
  (1, 'test', '123', '$2a$11$LasOrAb7H.EXaL0QGYdY6e/mx8JBze6Sjk.H4OhOVqffPhXteJ/KS', NOW(), NOW(), 1);

INSERT INTO `user`
(id, email, phone_number, password_hash, created, updated, verified)
VALUES
  (2, 'admin', '456', '$2a$11$fNcIEZC3CGkjNSlVPm1RROuqF/RxN9Gl0kkuWrb7fVzQJwsG50Wym', NOW(), NOW(), 1);

INSERT INTO `user_roles`
(id, user_id, role)
VALUES
  (1, 1, 'ROLE_USER'),
  (2, 1, 'ACTUATOR'),
  (3, 2, 'ROLE_ADMIN'),
  (4, 2, 'ROLE_USER');

  INSERT INTO `translation`
(id, text_en, text_nl, text_fr, created, updated)
VALUES
  (1, 'Coca Cola', 'Coca Cola', 'Coca Cola', NOW(), NOW()),
  (2, 'Coca Cola', 'Coca Cola', 'Coca Cola', NOW(), NOW()),
  (3, 'Jupiler', 'Jupiler', 'Jupiler', NOW(), NOW()),
  (4, 'Jupiler', 'Jupiler', 'Jupiler', NOW(), NOW()),
  (5, 'Smos', 'Smos', 'Smos', NOW(), NOW()),
  (6, 'Smos cheese', 'Smos kaas', 'Smos fromage', NOW(), NOW()),
  (7, 'Calippo Cola', 'Calippo Cola', 'Calippo Cola', NOW(), NOW()),
  (8, 'Calippo Orange', 'Calippo Orange', 'Calippo Orange', NOW(), NOW()),
  (9, '33cl', '33cl', '33cl', NOW(), NOW()),
  (10, '25cl', '25cl', '25cl', NOW(), NOW()),
  (11, '25cl', '25cl', '25cl', NOW(), NOW()),
  (12, '33cl', '33cl', '33cl', NOW(), NOW()),
  (13, 'cheese, vegetables', 'kaas, groenten', 'fromage, crudités', NOW(), NOW()),
  (14, 'cheese, ham, vegetables', 'kaas, hesp, groenten', 'fromage, jambon, crudités', NOW(), NOW()),
  (15, 'Top sellers', 'Toppers', 'Les mieux', NOW(), NOW()),
  (16, 'Drinks', 'dranken', 'Boison', NOW(), NOW()),
  (17, 'Snacks', 'Snacks', 'Snacks', NOW(), NOW()),
  (18, 'Top sellers',  'Toppers', 'Les mieux', NOW(), NOW()),
  (19, 'Soft drinks', 'Softdrinks', 'Softdrinks', NOW(), NOW()),
  (20, 'Beer', 'Bier', 'Bière', NOW(), NOW()),
  (21, 'Sandwiches', 'Sandwiches', 'Sandwiches', NOW(), NOW()),
  (22, 'Ice cream', 'Ijs', 'Crème', NOW(), NOW());


INSERT INTO `product_category`
(id, name_id, created, updated, sorting_order)
VALUES
  (1, 15, NOW(), NOW(), 1),
  (2, 16, NOW(), NOW(), 2),
  (3, 17, NOW(), NOW(), 3);

INSERT INTO `product_type`
(id, name_id, has_title, category_id, sorting_order, created, updated)
VALUES
  (1, 18, 0, 1, 1, NOW(), NOW()),
  (2, 19, 1, 2, 1, NOW(), NOW()),
  (3, 20, 1, 2, 2, NOW(), NOW()),
  (4, 21, 1, 3, 1, NOW(), NOW()),
  (5, 22, 1, 3, 2, NOW(), NOW());

INSERT INTO `product`
(id, name_id, extra_info_id, price, created, updated, active)
VALUES
  (1, 1, 9, 2.5, NOW(), NOW(), 1),
  (2, 2, 10, 2, NOW(), NOW(), 1),
  (3, 3, 11, 2, NOW(), NOW(), 1),
  (4, 4, 12, 2.5, NOW(), NOW(), 1),
  (5, 5, 13, 3.5, NOW(), NOW(), 1),
  (6, 6, 14, 3.5, NOW(), NOW(), 1),
  (7, 7, NULL, 1, NOW(), NOW(), 1),
  (8, 8, NULL, 1, NOW(), NOW(), 1);

INSERT INTO `product_type_product`
(product_type_id, product_id)
VALUES
  (2, 1),
  (2, 2),
  (3, 3),
  (3, 4),
  (4, 5),
  (4, 6),
  (5, 7),
  (5, 8),
  (1, 1),
  (1, 3),
  (1, 5),
  (1, 7);

INSERT INTO `shopping_cart`
(id, created, updated, session_id, status, beach_id, user_id, price)
VALUES
  (1, NOW(), NOW(), NULL, 'IN_PROGRESS', 1, 1, 0);