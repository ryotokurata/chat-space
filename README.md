# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# Chat-Space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :group, through: :users_group
- has_many :massage

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :user
- has_many :massage
- has_many :users_group

## users_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## massageテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||

### Association
- belongs_to :group
- belongs_to :user
