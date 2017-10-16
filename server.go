package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

func main() {

	var file *os.File
	var fileerr error
	var err error
	var host string

	host = ":8080"
	log.Println("log to ", string(os.Args[1]))
	logfile := os.Args[1]
	t := time.Now()
	logfile = fmt.Sprintf("%d-%02d-%02dT%02d-%02d-%02d", t.Year(), t.Month(), t.Day(), t.Hour(), t.Minute(), t.Second())
	file, fileerr = os.OpenFile(logfile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if fileerr != nil {
		log.Printf("error opening log file %s; %s\r\n", logfile, fileerr)
	} else {
		mw := io.MultiWriter(os.Stdout, file)
		log.SetOutput(mw)
		log.Printf("initilized log file %s\r\n", logfile)
	}
	log.Println("starting static file server...")
	http.Handle("/", wrapStaticServer(http.FileServer(http.Dir("static")), "static"))

	if _, err2 := os.Stat("https/server.crt"); os.IsNotExist(err2) {
		log.Printf("https fail, missing /web/https/server.crt\r\n")
		log.Printf("success binding '%s' unsecure connection... ok\r\n", host)
		err = http.ListenAndServe(host, nil)
	} else {
		log.Printf("success binding '%s' secure connection... ok\r\n", host)
		err = http.ListenAndServeTLS(host, "web/https/server.crt", "web/http/server.key", nil)
	}

	if err != nil {
		log.Printf("%s\r\n", err)
	} else {
		log.Printf("server exiting ok...\r\n")
	}
}

func wrapStaticServer(handler http.Handler, name string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		handler.ServeHTTP(w, r)
	})
}
