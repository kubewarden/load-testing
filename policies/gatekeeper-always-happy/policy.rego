package policy

violation[{"msg": msg}] {
	input.review.object == "sticazzi"
	msg := "not supposed to happen"
}
