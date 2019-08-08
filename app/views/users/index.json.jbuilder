json.arrsy! @users do |user|
  json.id user.id
  json.group_id user.group_id
  json.user_id user.user_id
  json.user_name user.user.name
end
