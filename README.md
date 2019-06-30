# README

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

## Association
- has_many :comments
- has_many :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false|
|name|string|null: false|

## Association
- has_many :comments
- has_many :members

## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|comment|string|null: false, foreign_key: true|
|image|string|null: false, foreign_key: true|

## Association
- belongs_to :user
- belngs_to :group

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
