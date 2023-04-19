function translate(string)
{
	function match(matching)
	{
		return matching==string
	}
	if(match("default")) return "默认"
	if(match("aqua")) return "水色"
	if(match("ALL")) return "全部"
	if(match("LAST, AUTO, INCOMPLETE")) return "上一个，自动"
	if(match("AUTOMATION, INCOMPLETE")) return "自动"
	if(match("INCOMPLETE")) return "不完全"
	if(match("NONE")) return "无"
}