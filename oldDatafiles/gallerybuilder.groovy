/* specify input folder, where all gallery-data-xxxx.groovy files are located, 
   and output folder, where HTML pages will be generated. */
def inputFolderPath = "/Users/Shared/2.009 Gallery Builder/gallery-builder/";
//def outputFolderPath = "/Library/WebServer/Documents/gallery/"; // the actual live location where code should live
def outputFolderPath = "/Users/Shared/2.009 Gallery Builder/gallery-builder/output/";

/* find data files in the input folder */
def data = [:]
def dataFiles = new File(inputFolderPath).listFiles().findAll { it.name ==~ /gallery\-data\-[0-9]{4}\.groovy/ }
dataFiles.sort()
//for (dataFile in dataFiles) {

println "found ${dataFiles.size()} data files: " + (dataFiles*.name).toString();

/* merge data in multiple data files into one data map */
for (dataFile in dataFiles) {
    println "reading " + dataFile.name
    def dataFileLines = dataFile.readLines().join("\r\n")
    def dataForOneYear = groovy.util.Eval.me(dataFileLines);
    data.putAll(dataForOneYear);
}

/* set up bindings that will replace ${something} in the template files */
def years = [];
def themes = []
data.each({
    themes.add(it.value)
    years.add(it.key)
})
def binding = [:]
binding.put("themes", themes)
binding.put("copyrightYear", new GregorianCalendar().get(Calendar.YEAR))

/* locate template files in the current directory */
def listTemplateFile = new File(inputFolderPath + "list.template.html")
def viewTemplateFilePre2012 = new File(inputFolderPath + "view.templatepre2012.html")
def viewTemplateFile2012 = new File(inputFolderPath + "view.template2012.html")
def viewTemplateFile2014 = new File(inputFolderPath + "view.template2014.html")
def engine = new groovy.text.GStringTemplateEngine()

/* create an output folder if it doesn't exist */
def outputFolder = new File(outputFolderPath)
if (! outputFolder.exists() || ! outputFolder.isDirectory()) { outputFolder.mkdir() }

/* uncomment the below line when you want to generate pages for certain years */
//years = [ "2013" ]

/* for each year */
for (curYear in years) {
    def curTheme = data[curYear]
    def highlights = curTheme["highlights"]
    def projects = curTheme["projects"]
    def highlightDividerIndexes = curTheme.get("highlightDividerIndexes", [ -1 ])

    binding.put("curTheme", curTheme)
    binding.put("projects", projects)
    binding.put("highlights", highlights)
    binding.put("highlightDividerIndexes", highlightDividerIndexes)

    def listHtml = engine.createTemplate(listTemplateFile).make(binding).toString()
    def writeListFile = new File(outputFolderPath + "list-${curTheme.themeYear}.html")
    if (writeListFile.exists()) { writeListFile.delete() }
    writeListFile << listHtml
    println "created ${writeListFile}"

    /* for each project */
    for (curProject in projects) {
        binding.put("curProject", curProject)

        def viewHtml = ""
        /* based on the year, switch the template file to use new format of videos, different number of sketch models/mockups */
        if (curYear == "2014" || curYear == "2015") {
            viewHtml = engine.createTemplate(viewTemplateFile2014).make(binding).toString()
        } else if (curYear == "2012" || curYear == "2013") {
            viewHtml = engine.createTemplate(viewTemplateFile2012).make(binding).toString()
        } else {
            viewHtml = engine.createTemplate(viewTemplateFilePre2012).make(binding).toString()
        }

        def writeViewFile = new File(outputFolderPath + "view-${curTheme.themeYear}-${curProject.projId}.html")
        if (writeViewFile.exists()) { writeViewFile.delete() }
        writeViewFile << viewHtml
        println "created ${writeViewFile}"
    }
}
println "finished creating gallery pages for ${years}."