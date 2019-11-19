# README

<img src="https://user-images.githubusercontent.com/55865498/68070545-3c0d7900-fdb3-11e9-80ae-3ba78bb192cb.png">

### ①usersテーブル
|Column|Type|Options|
|:------:|:----:|:-------:|
|name|varchar(255)|null: false|
|email|varchar(255)|null: false, unique: true|
|password|char(32)|null: false|
#### Association
- has_many :messages
- has_many :users_groups
- has_many :groups through: :users_groups

***

### ②groupsテーブル
|Column|Type|Options|
|:------:|:----:|:-------:|
|group_name|varchar(255)|null: false|
|user_id|varchar(255)|null: false, foreign_key: true|
#### Association
- has_many :messages
- has_many :users_groups
- has_many :users through: :users_groups

***

### ③users_groupsテーブル(中間テーブル)
|Column|Type|Options|
|:------:|:----:|:-------:|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
#### Association
- belongs_to :user
- belongs_to :group

***

### ④messagesテーブル
|Column|Type|Options|
|:------:|:----:|:-------:|
|body|text|null: false|
|image|string|null: true|
|group_id|integer|null: false, foreign_key: true|
|user_id|varchar(255)|null: false, foreign_key: true|
#### Association
- belongs_to :user
- belongs_to :group

##### everysteps_is_done